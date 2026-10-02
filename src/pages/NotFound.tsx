/**
 * @fileoverview Tela 404 (Página Não Encontrada) com navegação de resgate.
 * @module pages/NotFound
 */

import { Link } from 'react-router-dom';
import { FileQuestion, Home, ShoppingCart } from 'lucide-react';

export function NotFound() {
  return (
    <div className="py-24 text-center">
      <div className="container mx-auto px-4 max-w-md">
        <div className="w-20 h-20 rounded-full bg-brand-soft/60 text-brand-secondary flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
          Erro 404
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-1 mb-3">
          Página Não Encontrada
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-8 leading-relaxed">
          O endereço solicitado não existe ou pode ter sido movido.
          Utilize os botões abaixo para retornar com segurança à navegação da Dental Santo Antônio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-hover shadow-xs transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Página Inicial</span>
          </Link>
          <Link
            to="/produtos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Ver Catálogo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
