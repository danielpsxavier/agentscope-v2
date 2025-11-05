import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { SidebarProvider } from '@/components/ui/sidebar'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import ClientsPage from './pages/Clients'
import ClientDetailPage from './pages/ClientDetail'
import OpportunitiesPage from './pages/OpportunitiesPage'
import AnalysisPage from './pages/AnalysisPage'
import ExternalOpportunityFormPage from './pages/ExternalOpportunityForm'
import ThankYouPage from './pages/ThankYou'
import LoginPage from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import UsersPage from './pages/UsersPage'
import ProfilePage from './pages/ProfilePage'

const AppRoutes = () => {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/oportunidades/cadastro-externo"
        element={<ExternalOpportunityFormPage />}
      />
      <Route path="/obrigado" element={<ThankYouPage />} />

      {/* Authenticated Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/clientes/:clientId" element={<ClientDetailPage />} />
          <Route path="/oportunidades" element={<OpportunitiesPage />} />
          <Route path="/analises" element={<AnalysisPage />} />
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
  >
    <AuthProvider>
      <SidebarProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </SidebarProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
