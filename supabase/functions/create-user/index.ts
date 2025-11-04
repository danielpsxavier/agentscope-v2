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

    const { email, password, full_name, bio } = await req.json()

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
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        full_name,
        bio,
        avatar_url: `https://img.usecurling.com/ppl/medium?seed=${userId}`, // Default avatar
      })

    if (profileError) {
      // If profile creation fails, roll back by deleting the auth user
      await supabaseAdmin.auth.admin.deleteUser(userId)
      throw profileError
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
