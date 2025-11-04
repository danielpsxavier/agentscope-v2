import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import ClientsPage from './pages/Clients'
import ClientDetailPage from './pages/ClientDetail'
import OpportunitiesPage from './pages/OpportunitiesPage'
import AnalysisPage from './pages/AnalysisPage'

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
  >
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/clientes" element={<ClientsPage />} />
            <Route path="/clientes/:clientId" element={<ClientDetailPage />} />
            <Route path="/oportunidades" element={<OpportunitiesPage />} />
            <Route path="/analises" element={<AnalysisPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
