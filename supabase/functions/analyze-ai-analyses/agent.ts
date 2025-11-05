// This file simulates the core AI agent logic.
// In a real-world scenario, this would involve making a call to an AI service like OpenAI.

// The structure of the mapping data received from the database.
interface MappingContext {
  department_on_mapping?: string | null
  business_objective?: string | null
  main_systems_on_mapping?: string | null
  critical_systems?: string | null
}

// The structure of the JSON output expected from the AI agent.
export interface AIResponse {
  nome: string
  descricao: string
  objetivo: string
  tools: { nome: string; descricao: string }[]
  beneficios_esperados: string[]
  tamanho: 'P' | 'M' | 'G'
}

/**
 * Simulates invoking an AI agent to generate ideas based on client context.
 * @param mapping - The operational context from the opportunity mapping.
 * @returns A promise that resolves to an array of AI-generated agent ideas.
 */
export const generateAgentIdeas = async (
  mapping: MappingContext,
): Promise<AIResponse[]> => {
  // Simulate network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const department = mapping.department_on_mapping || 'Operações'
  const objective = mapping.business_objective || 'otimizar processos'
  const systems = mapping.main_systems_on_mapping || 'sistemas legados'

  const idea1: AIResponse = {
    nome: `Agente de Automação para ${department}`,
    descricao: `Um agente proativo que monitora ${systems} para identificar e automatizar tarefas repetitivas, alinhado com o objetivo de ${objective}.`,
    objetivo: `Reduzir o tempo gasto em tarefas manuais e aumentar a eficiência operacional do departamento de ${department}.`,
    tools: [
      {
        nome: 'SystemConnector',
        descricao: `Conecta-se de forma segura aos ${systems} para ler e escrever dados.`,
      },
      {
        nome: 'TaskIdentifier',
        descricao:
          'Usa machine learning para identificar padrões de tarefas repetitivas.',
      },
      {
        nome: 'ReportGenerator',
        descricao: 'Gera relatórios de performance e economia de tempo.',
      },
      {
        nome: 'EmailNotifier',
        descricao:
          'Envia notificações por e-mail sobre as automações executadas.',
      },
      {
        nome: 'DataValidator',
        descricao:
          'Valida os dados antes de inseri-los nos sistemas para garantir a consistência.',
      },
    ],
    beneficios_esperados: [
      'Redução de até 40% no tempo de execução de tarefas manuais.',
      'Minimização de erros humanos.',
      'Liberação da equipe para focar em atividades de maior valor agregado.',
    ],
    tamanho: 'P',
  }

  const idea2: AIResponse = {
    nome: `Assistente Inteligente de ${department}`,
    descricao: `Um assistente conversacional que permite à equipe interagir com ${systems} usando linguagem natural, simplificando consultas e a execução de processos.`,
    objetivo: `Facilitar o acesso à informação e a execução de processos, diminuindo a curva de aprendizado e a dependência de treinamento extensivo.`,
    tools: [
      {
        nome: 'NaturalLanguageProcessor',
        descricao:
          'Interpreta as solicitações do usuário em linguagem natural.',
      },
      {
        nome: 'SystemQueryAPI',
        descricao: `Realiza consultas em tempo real nos ${systems}.`,
      },
      {
        nome: 'ProcessExecutor',
        descricao:
          'Inicia e acompanha a execução de processos de negócio (ex: abrir um chamado, aprovar uma solicitação).',
      },
      {
        nome: 'KnowledgeBaseSearch',
        descricao:
          'Busca informações em bases de conhecimento internas para responder a dúvidas.',
      },
      {
        nome: 'UserAuthenticator',
        descricao:
          'Gerencia a autenticação e as permissões do usuário para acesso aos sistemas.',
      },
      {
        nome: 'ActionLogger',
        descricao:
          'Registra todas as interações e ações executadas para fins de auditoria.',
      },
      {
        nome: 'MultiChannelAPI',
        descricao:
          'Permite a interação através de múltiplos canais, como Slack, Teams ou um web chat.',
      },
    ],
    beneficios_esperados: [
      'Acesso rápido e fácil a informações críticas.',
      'Redução do tempo de treinamento para novos colaboradores.',
      'Aumento da satisfação da equipe ao simplificar interações com sistemas complexos.',
    ],
    tamanho: 'M',
  }

  return [idea1, idea2]
}
