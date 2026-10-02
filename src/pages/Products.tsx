/**
 * @fileoverview Catálogo completo de produtos com motor de busca, filtros de categoria e conformidade Anvisa.
 * @module pages/Products
 */

import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';
import { products, categories } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductFilter, SortOption } from '@/components/product/ProductFilter';
import { useDebounce } from '@/hooks/useDebounce';

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('categoria') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [onlyRestricted, setOnlyRestricted] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 250);

  // Manipulação de mudança de categoria atualizando query params
  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', catId);
    }
    setSearchParams(searchParams);
  };

  // Filtragem combinada
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Filtro por Categoria
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Filtro por Produtos Restritos (Anvisa)
        if (onlyRestricted && !product.isRestricted) {
          return false;
        }

        // Filtro por Busca Textual (Nome, Descrição, Categoria)
        if (debouncedSearch.trim()) {
          const query = debouncedSearch.toLowerCase().trim();
          const matchName = product.name.toLowerCase().includes(query);
          const matchDesc = product.description.toLowerCase().includes(query);
          const matchCat = product.category.toLowerCase().includes(query);
          return matchName || matchDesc || matchCat;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [selectedCategory, onlyRestricted, debouncedSearch, sortBy]);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        {/* Cabeçalho da Página */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
            Catálogo Odontológico
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1 mb-3">
            Nossos Produtos & Suprimentos
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Consulte materiais restauradores, instrumentos cirúrgicos, anestésicos e equipamentos.
            Adicione ao orçamento e receba a cotação oficial no WhatsApp.
          </p>
        </div>

        {/* Barra de Filtros e Busca */}
        <ProductFilter
          categories={categories}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onlyRestricted={onlyRestricted}
          onToggleOnlyRestricted={() => setOnlyRestricted((prev) => !prev)}
          totalFiltered={filteredProducts.length}
        />

        {/* Grade de Produtos ou Estado Vazio */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-gray-100 max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-brand-soft/60 flex items-center justify-center text-brand-secondary mx-auto mb-4">
              <PackageSearch className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Nenhum produto localizado
            </h2>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Não encontramos nenhum item correspondente aos critérios selecionados.
              Tente buscar por termos mais genéricos ou redefina os filtros.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyRestricted(false);
                setSortBy('default');
              }}
              className="px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-hover shadow-xs transition-all"
            >
              Ver todos os produtos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
