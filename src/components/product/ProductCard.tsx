/**
 * @fileoverview Card de produto com indicação de conformidade regulatória Anvisa e ação de orçamento.
 * @module components/product/ProductCard
 */

import { useState } from 'react';
import { ShoppingCart, Check, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Product } from '@/types/product';
import { useBudget } from '@/context/BudgetContext';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import { Badge } from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useBudget();
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = items.find((item) => item.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Container de Imagem */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge de Produto Restrito (Anvisa) */}
        {product.isRestricted && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="warning" className="shadow-xs backdrop-blur-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Produto Restrito</span>
            </Badge>
          </div>
        )}

        {/* Badge de Quantidade Atual no Carrinho */}
        {currentQuantity > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-brand-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
              {currentQuantity} no orçamento
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-1 mb-1.5">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>

          {/* Aviso regulatório específico quando aplicável */}
          {product.isRestricted && product.restrictionNotice && (
            <div className="mb-3.5 p-2 rounded-lg bg-amber-50/80 border border-amber-200/60 flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800 leading-tight">
                {product.restrictionNotice}
              </p>
            </div>
          )}
        </div>

        {/* Preço e Botão de Ação */}
        <div className="pt-2 border-t border-gray-100 mt-2">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xs text-gray-400 font-medium">Preço unitário</span>
            <span className="text-lg font-extrabold text-brand-secondary">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/30 ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-xs'
                : currentQuantity > 0
                ? 'bg-brand-soft text-brand-primary hover:bg-brand-soft/80 border border-brand-accent/20'
                : 'bg-brand-primary text-white hover:bg-brand-primary-hover shadow-xs hover:shadow-md'
            }`}
            aria-label={`Adicionar ${product.name} ao orçamento`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Adicionado!</span>
              </>
            ) : currentQuantity > 0 ? (
              <>
                <ShoppingCart className="w-4 h-4 text-brand-primary" />
                <span>Adicionar mais (+1)</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 text-white" />
                <span>Adicionar ao orçamento</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
