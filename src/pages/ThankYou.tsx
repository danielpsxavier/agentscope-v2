import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-neutral-pageBackground flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg animate-fade-in-up">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="mt-4 text-2xl">Obrigado!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-textSecondary mb-6">
            Sua oportunidade foi cadastrada com sucesso. Nossa equipe analisará
            as informações em breve.
          </p>
          <Button asChild className="primary-btn">
            <a
              href="https://skip.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voltar ao Início
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default ThankYouPage
