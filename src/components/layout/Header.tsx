/**
 * @fileoverview Cabeçalho principal com navegação responsiva e indicador do orçamento.
 * @module components/layout/Header
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useBudget } from '@/context/BudgetContext';
import logo from '@/assets/logo.png';

interface NavLinkItem {
  path: string;
  label: string;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems, getTotalValue } = useBudget();

  const navLinks: NavLinkItem[] = [
    { path: '/', label: 'Home' },
    { path: '/produtos', label: 'Produtos' },
    { path: '/orcamento', label: 'Orçamento' },
    { path: '/contato', label: 'Contato' },
    { path: '/politica-privacidade', label: 'Privacidade' },
  ];

  const totalItems = getTotalItems();
  const totalValue = getTotalValue();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-xs">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logotipo */}
          <Link
            to="/"
            className="flex items-center focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/30 rounded-xl group py-0.5"
            title="Dental Santo Antônio - Página Inicial"
          >
            <img
              src={logo}
              alt="Dental Santo Antônio"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
            />
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-brand-secondary ${
                    active
                      ? 'text-brand-primary font-bold border-b-2 border-brand-secondary pb-1'
                      : 'text-gray-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Carrinho / Orçamento & Menu Mobile */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/orcamento"
              className={`relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl transition-all ${
                totalItems > 0
                  ? 'bg-brand-soft/70 hover:bg-brand-soft text-brand-primary font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              title="Visualizar Orçamento"
              aria-label={`Ver orçamento com ${totalItems} itens`}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-brand-primary" />
                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-brand-secondary text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-brand-primary">
                {totalItems === 0
                  ? 'Orçamento Vazio'
                  : `R$ ${totalValue.toFixed(2).replace('.', ',')}`}
              </span>
            </Link>

            {/* Botão Menu Mobile */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg text-brand-primary hover:bg-brand-soft/50 transition-colors focus:outline-hidden"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <nav className="lg:hidden pt-4 pb-2 border-t border-gray-100 mt-3 space-y-1 animate-fadeIn">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-brand-soft text-brand-primary font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
