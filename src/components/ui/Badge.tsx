/**
 * @fileoverview Componente visual de Badge para destacar estados e conformidades regulatórias.
 * @module components/ui/Badge
 */

import React from 'react';

type BadgeVariant = 'brand' | 'warning' | 'info' | 'success';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = 'brand', className = '' }: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    brand: 'bg-brand-soft text-brand-primary border-brand-accent/30',
    warning: 'bg-amber-50 text-amber-800 border-amber-300',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
