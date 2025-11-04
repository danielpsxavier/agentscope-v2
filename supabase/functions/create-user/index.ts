import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Use the Service Role Key for admin-level access
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { email, password, full_name } = await req.json()

    if (!email || !password || !full_name) {
      throw new Error('Email, senha e nome completo são obrigatórios.')
    }

    // 1. Create the user in auth.users
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm for admin-created users
        user_metadata: { full_name },
      })

    if (authError) throw authError
    if (!authData.user)
      throw new Error('Falha ao criar usuário na autenticação.')

    const userId = authData.user.id

    // 2. Create the corresponding profile in public.profiles
    // The trigger `on_auth_user_created` will handle this automatically.
    // However, to ensure `full_name` is set immediately from the function call,
    // we can perform an upsert or an update here.
    // For simplicity and to rely on the trigger, we can also pass full_name in user_metadata
    // and have the trigger use it. The current trigger does this.
    // Let's ensure the profile is created with the correct full_name.
    // The trigger already handles this, but an explicit update ensures it.
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ full_name: full_name })
      .eq('id', userId)

    if (profileError) {
      // If profile update fails, it's not critical, but we should log it.
      // The profile was already created by the trigger.
      console.error('Error updating profile with full_name:', profileError)
    }

    return new Response(
      JSON.stringify({ message: 'Usuário criado com sucesso.' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      },
    )
  } catch (error) {
    console.error('Erro na função create-user:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
