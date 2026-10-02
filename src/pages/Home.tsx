/**
 * @fileoverview Página Inicial da Dental Santo Antônio com destaques e chamada para orçamentos.
 * @module pages/Home
 */

import { Link } from 'react-router-dom';
import { ArrowRight, Package, ShieldCheck, Clock, Award, GraduationCap, Building2, UserCheck } from 'lucide-react';
import { categories } from '@/data/products';
import { CategoryCard } from '@/components/product/CategoryCard';
import { COMPANY_CONFIG } from '@/config/company';

export function Home() {
  const features = [
    {
      icon: Package,
      title: 'Amplo Catálogo',
      description: 'Mais de 1.000 suprimentos odontológicos de marcas líderes globais',
    },
    {
      icon: ShieldCheck,
      title: 'Compliance Anvisa',
      description: 'Rastreabilidade de lote, garantia do fabricante e autorização sanitária',
    },
    {
      icon: Clock,
      title: 'Orçamento Express',
      description: 'Atendimento comercial via WhatsApp com resposta em minutos no horário comercial',
    },
    {
      icon: Award,
      title: 'Tradição e Confiança',
      description: 'Mais de 15 anos fornecendo insumos com excelência para a Bahia e Brasil',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary text-white py-20 sm:py-28 overflow-hidden shadow-lg">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block py-1.5 px-4 rounded-full bg-brand-soft/20 text-brand-soft text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-xs">
              E-commerce & Cotações B2B Odontológicas
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Seu Consultório Abastecido com Agilidade e Confiança
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-brand-soft/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Monte sua lista de materiais clínicos, anestésicos e instrumentais cirúrgicos.
              Receba sua proposta personalizada direto no WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/produtos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-brand-soft text-brand-primary font-bold text-sm shadow-lg hover:bg-white hover:scale-105 transition-all"
              >
                <span>Explorar Catálogo Completo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/orcamento"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-xs transition-all"
              >
                Ver Meu Orçamento
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Perfis Atendidos (Dentistas, Clínicas e Acadêmicos) */}
      <section className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Atendimento Especializado para Cada Perfil
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Facilitamos o processo de cotação tanto para profissionais estabelecidos quanto para futuros cirurgiões-dentistas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-brand-soft/60 flex items-center justify-center text-brand-primary mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Cirurgiões-Dentistas</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Cotações rápidas com número de CRO, faturamento facilitado e suporte técnico para escolha de instrumentais e anestésicos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-brand-soft/60 flex items-center justify-center text-brand-primary mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Clínicas e Redes Odontológicas</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Condições para compras por atacado no CNPJ, faturamento recorrente e entrega programada de insumos descartáveis.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-brand-soft/60 flex items-center justify-center text-brand-primary mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">Estudantes de Odontologia</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Listas acadêmicas completas para períodos clínicos, descontos especiais de graduação e validação simples via matrícula.
            </p>
          </div>
        </div>
      </section>

      {/* Destaques de Categorias */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
              Categorias em Destaque
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              Encontre o que seu Consultório Precisa
            </h2>
          </div>
          <Link
            to="/produtos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-secondary transition-colors"
          >
            <span>Ver todas as categorias</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Diferenciais e Garantias */}
      <section className="bg-gray-50 py-16 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Por que Comprar na {COMPANY_CONFIG.name}?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Compromisso ético, conformidade regulatória e agilidade no fornecimento odontológico.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-soft/50 text-brand-secondary flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1.5">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-linear-to-r from-brand-primary to-brand-secondary rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
              Pronto para Montar sua Cotação?
            </h2>
            <p className="text-xs sm:text-sm text-brand-soft/90 mb-8 leading-relaxed">
              Adicione os suprimentos necessários ao carrinho e conclua a negociação em poucos cliques com nossos consultores especializados.
            </p>
            <Link
              to="/produtos"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-soft text-brand-primary font-bold text-sm shadow-md hover:bg-white hover:scale-105 transition-all"
            >
              <span>Acessar Lista de Produtos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
