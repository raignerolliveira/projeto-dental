/**
 * @fileoverview Barra de ferramentas com busca instantânea, chips de categorias e ordenação.
 * @module components/product/ProductFilter
 */

import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Category } from '@/types/product';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

interface ProductFilterProps {
  categories: Category[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onlyRestricted: boolean;
  onToggleOnlyRestricted: () => void;
  totalFiltered: number;
}

export function ProductFilter({
  categories,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  onlyRestricted,
  onToggleOnlyRestricted,
  totalFiltered,
}: ProductFilterProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-xs mb-8">
      {/* Linha Superior: Busca e Ordenação */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-5">
        {/* Barra de Busca com Clear Button */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nome, resina, anestésico, autoclave..."
            className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 focus:border-brand-secondary transition-all"
            aria-label="Buscar produtos odontológicos"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-md"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown de Ordenação & Filtro de Controlados */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40 cursor-pointer"
              aria-label="Ordenar produtos"
            >
              <option value="default">Relevância / Padrão</option>
              <option value="price-asc">Menor Preço (R$)</option>
              <option value="price-desc">Maior Preço (R$)</option>
              <option value="name-asc">Nome (A - Z)</option>
            </select>
          </div>

          {/* Toggle de Apenas Anvisa */}
          <button
            onClick={onToggleOnlyRestricted}
            className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
              onlyRestricted
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            🛡️ Apenas Controlados (Anvisa)
          </button>
        </div>
      </div>

      {/* Linha Inferior: Chips de Categoria */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectCategory('all')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-brand-primary text-white shadow-xs'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Todas as Categorias
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-brand-secondary text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Contador de resultados */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>
          Exibindo <strong>{totalFiltered}</strong> produto(s) encontrado(s)
        </span>
        {(searchQuery || selectedCategory !== 'all' || onlyRestricted) && (
          <button
            onClick={() => {
              onSearchChange('');
              onSelectCategory('all');
              if (onlyRestricted) onToggleOnlyRestricted();
            }}
            className="text-brand-secondary hover:underline font-medium"
          >
            Limpar todos os filtros
          </button>
        )}
      </div>
    </div>
  );
}
