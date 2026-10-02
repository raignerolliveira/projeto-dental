/**
 * @fileoverview Página de categoria específica com listagem direcionada de materiais.
 * @module pages/Category
 */

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, ShieldCheck } from 'lucide-react';
import { getCategoryById, getProductsByCategory } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getCategoryById(categoryId || '');
  const allCategoryProducts = getProductsByCategory(categoryId || '');

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = allCategoryProducts.filter((product) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Categoria não encontrada</h1>
        <p className="text-xs text-gray-500 mb-6">
          A categoria solicitada não existe ou foi descontinuada.
        </p>
        <Link
          to="/produtos"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-hover"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Todos os Produtos</span>
        </Link>
      </div>
    );
  }

  const hasRestricted = allCategoryProducts.some((p) => p.isRestricted);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        {/* Breadcrumb e Retorno */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-brand-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para o catálogo completo</span>
          </Link>

          <span className="text-xs text-gray-400">
            {allCategoryProducts.length} produto(s) nesta categoria
          </span>
        </div>

        {/* Banner da Categoria */}
        <div className="relative rounded-3xl bg-linear-to-r from-brand-primary to-brand-secondary text-white p-8 sm:p-10 mb-8 shadow-md overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-brand-soft text-[11px] font-bold uppercase tracking-wider mb-3 backdrop-blur-xs">
              Departamento Odontológico
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">{category.name}</h1>
            <p className="text-xs sm:text-sm text-brand-soft/90 leading-relaxed">
              {category.description}
            </p>

            {hasRestricted && (
              <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/20 border border-amber-300/30 text-amber-200 text-xs px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Esta categoria contém itens controlados sujeitos a normas da Anvisa</span>
              </div>
            )}
          </div>
        </div>

        {/* Busca dentro da categoria */}
        <div className="max-w-md mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Filtrar produtos em ${category.name}...`}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 shadow-xs"
            />
          </div>
        </div>

        {/* Grade de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 max-w-md mx-auto">
            <p className="text-xs text-gray-500 mb-4">
              Nenhum item encontrado com o termo &quot;{searchQuery}&quot; nesta categoria.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-brand-secondary hover:underline"
            >
              Limpar busca
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
