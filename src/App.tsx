/**
 * @fileoverview Componente raiz da aplicação Dental Santo Antônio.
 * Configura roteamento, provedor de orçamento e notificações com Toaster Sonner.
 * @module App
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { BudgetProvider } from '@/context/BudgetContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { Category } from '@/pages/Category';
import { Budget } from '@/pages/Budget';
import { Contact } from '@/pages/Contact';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { NotFound } from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <BudgetProvider>
        {/* Provedor de Notificações Toast com estilo e cores da marca */}
        <Toaster position="top-right" richColors closeButton expand />

        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased selection:bg-brand-soft selection:text-brand-primary">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/categoria/:categoryId" element={<Category />} />
              <Route path="/orcamento" element={<Budget />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BudgetProvider>
    </BrowserRouter>
  );
}
