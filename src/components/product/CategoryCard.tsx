/**
 * @fileoverview Card interativo para navegação em categorias do catálogo.
 * @module components/product/CategoryCard
 */

import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Category } from '@/types/product';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/categoria/${category.id}`}
      className="group block relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-brand-secondary/40"
    >
      <div className="aspect-4/3 w-full overflow-hidden bg-gray-100">
        <ImageWithFallback
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay escuro em gradiente para legibilidade do texto */}
        <div className="absolute inset-0 bg-linear-to-t from-brand-primary/95 via-brand-primary/60 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-lg font-bold mb-1 text-white group-hover:text-brand-soft transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-white/80 line-clamp-2 mb-3">
          {category.description}
        </p>
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-soft group-hover:text-white transition-colors">
          <span>Explorar materiais</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
