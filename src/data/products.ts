/**
 * @fileoverview Catálogo mock de categorias e produtos odontológicos com metadados de compliance Anvisa
 * e imagens fotográficas específicas e individualizadas para cada item.
 * @module data/products
 */

import { Category, Product } from '@/types/product';

/**
 * Categorias disponíveis na Dental Santo Antônio com fotos de capa exclusivas.
 */
export const categories: Category[] = [
  {
    id: 'instrumentos',
    name: 'Instrumentos Odontológicos',
    description: 'Pinças, espelhos, sondas e outros instrumentos cirúrgicos essenciais em aço inox autoclavável',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'materiais-restauracao',
    name: 'Materiais de Restauração',
    description: 'Resinas compostas estéticas, ionômeros de vidro e adesivos monocomponentes de alta adesão',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'equipamentos',
    name: 'Equipamentos & Consultório',
    description: 'Autoclaves hospitalares, fotopolimerizadores LED, compressores silenciosos e alta tecnologia',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'biosseguranca',
    name: 'Biossegurança & EPIs',
    description: 'Luvas descartáveis, máscaras cirúrgicas triplas, óculos de proteção e álcool 70% antisséptico',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'anestesicos',
    name: 'Anestésicos & Injetáveis',
    description: 'Anestésicos locais com epinefrina, carpules, agulhas gengivais e géis tópicos (Anvisa)',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'ortodontia',
    name: 'Ortodontia',
    description: 'Brackets metálicos prescrição Roth, fios NiTi termoativados, elásticos intermaxilares e resinas',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&auto=format&fit=crop&q=80',
  },
];

/**
 * Catálogo completo de suprimentos odontológicos com imagens individualizadas e metadados de compliance.
 */
export const products: Product[] = [
  // 1. Instrumentos Odontológicos
  {
    id: 'inst-001',
    name: 'Kit de Espelhos Bucais Planos e Côncavos',
    price: 89.90,
    description: 'Conjunto com 12 espelhos bucais em aço inox autoclavável com alta nitidez refletiva para diagnóstico.',
    category: 'instrumentos',
    image: 'https://images.unsplash.com/photo-1606811856475-5e6fcdc6e509?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'inst-002',
    name: 'Pinça Clínica em Aço Inox Cirúrgico',
    price: 45.50,
    description: 'Pinça clínica com ponta serrilhada de alta precisão, resistente a múltiplos ciclos de esterilização.',
    category: 'instrumentos',
    image: 'https://plus.unsplash.com/premium_photo-1673728800262-2acd6a815a2c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'inst-003',
    name: 'Sonda Exploradora Nº 5 com Cabo Ergonômico',
    price: 32.00,
    description: 'Sonda exploradora dupla balanceada para diagnóstico clínico de lesões cariosas e biofilme.',
    category: 'instrumentos',
    image: 'https://plus.unsplash.com/premium_photo-1744688379368-2fc65713235c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'inst-004',
    name: 'Afastador Labial Flexível Autoclavável',
    price: 25.90,
    description: 'Afastador labial para fotografia odontológica e procedimentos em arco completo, tamanho adulto.',
    category: 'instrumentos',
    image: 'https://plus.unsplash.com/premium_photo-1674998806375-58edc35ddf3b?w=600&auto=format&fit=crop&q=80',
  },

  // 2. Materiais de Restauração
  {
    id: 'rest-001',
    name: 'Resina Composta Universal Nanohíbrida',
    price: 185.00,
    description: 'Resina fotopolimerizável com alta carga de partículas, excelente polimento e efeito camaleão.',
    category: 'materiais-restauracao',
    image: 'https://plus.unsplash.com/premium_photo-1676333345832-d2901e1b5a8c?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'rest-002',
    name: 'Cimento de Ionômero de Vidro Restaurador',
    price: 125.00,
    description: 'Cimento restaurador com liberação contínua de flúor e biocompatibilidade para restaurações estéticas.',
    category: 'materiais-restauracao',
    image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'rest-003',
    name: 'Adesivo Dentinário Universal Monocomponente',
    price: 95.50,
    description: 'Sistema adesivo autocondicionante de alta adesão em esmalte e dentina úmida.',
    category: 'materiais-restauracao',
    image: 'https://plus.unsplash.com/premium_photo-1690116977873-db6296c22d33?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'rest-004',
    name: 'Kit de Acabamento e Polimento Diamantado',
    price: 215.00,
    description: 'Sortimento de discos abrasivos, mandris e pontas espirais para brilho natural imediato.',
    category: 'materiais-restauracao',
    image: 'https://images.unsplash.com/photo-1643660527072-47bd5735f721?w=600&auto=format&fit=crop&q=80',
  },

  // 3. Equipamentos
  {
    id: 'equip-001',
    name: 'Autoclave Digital Hospitalar 12L',
    price: 4500.00,
    description: 'Autoclave com câmara em inox, ciclo rápido de secagem e monitoramento eletrônico de temperatura.',
    category: 'equipamentos',
    image: 'https://plus.unsplash.com/premium_photo-1661507183946-559d65a5ad5e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'equip-002',
    name: 'Fotopolimerizador LED Sem Fio 1200mW',
    price: 890.00,
    description: 'Aparelho fotopolimerizador sem fio com emissão de luz azul concentrada e múltiplos modos temporizados.',
    category: 'equipamentos',
    image: 'https://plus.unsplash.com/premium_photo-1702598583569-1625e29fed97?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'equip-003',
    name: 'Amalgamador Digital Microprocessado',
    price: 1250.00,
    description: 'Amalgamador digital com timer eletrônico preciso e amortecimento de vibração para cápsulas odontológicas.',
    category: 'equipamentos',
    image: 'https://plus.unsplash.com/premium_photo-1663045850701-4711b3baeca4?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'equip-004',
    name: 'Compressor Odontológico Silencioso 40L',
    price: 3200.00,
    description: 'Compressor isento de óleo com pintura interna antibacteriana, ideal para até 2 consultórios.',
    category: 'equipamentos',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
  },

  // 4. Biossegurança
  {
    id: 'bio-001',
    name: 'Luvas de Procedimento Não Cirúrgico (cx 100un)',
    price: 45.00,
    description: 'Luvas descartáveis de látex e nitrilo microtexturizadas, tamanho M com alta sensibilidade tátil.',
    category: 'biosseguranca',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'bio-002',
    name: 'Máscaras Descartáveis Tripla Camada (cx 50un)',
    price: 35.00,
    description: 'Máscaras cirúrgicas com elemento filtrante bacteriológico (BFE >= 98%) e elástico confortável.',
    category: 'biosseguranca',
    image: 'https://plus.unsplash.com/premium_photo-1725075089198-b78f625290bd?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'bio-003',
    name: 'Álcool Etílico 70% Hospitalar - 1 Litro',
    price: 18.50,
    description: 'Solução desinfetante antisséptica para superfícies fixas e ambientes clínicos odontológicos.',
    category: 'biosseguranca',
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'bio-004',
    name: 'Óculos de Proteção com Tratamento Antiembaçante',
    price: 28.00,
    description: 'Óculos de segurança com proteção lateral e hastes anatômicas ajustáveis contra aerossóis e respingos.',
    category: 'biosseguranca',
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=600&auto=format&fit=crop&q=80',
  },

  // 5. Anestésicos & Injetáveis (Regulamentados pela Anvisa)
  {
    id: 'anest-001',
    name: 'Anestésico Tópico Gel de Benzocaína 20% (12g)',
    price: 42.00,
    description: 'Gel anestésico para alívio prévio à punção de anestesia infiltrativa, aroma menta refrescante.',
    category: 'anestesicos',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    isRestricted: true,
    restrictionNotice: 'Venda restrita sob prescrição ou registro CRO/CNPJ/Matrícula acadêmica.',
  },
  {
    id: 'anest-002',
    name: 'Tubetes Anestésicos Articaína 4% com Epinefrina (cx 50un)',
    price: 125.00,
    description: 'Anestésico local com vasoconstritor em tubetes de vidro de ação rápida e profunda para cirurgias.',
    category: 'anestesicos',
    image: 'https://plus.unsplash.com/premium_photo-1668487827105-9139219cb19a?w=600&auto=format&fit=crop&q=80',
    isRestricted: true,
    restrictionNotice: 'Produto controlado pela Anvisa. Exige apresentação de CRO ativo ou comprovante institucional.',
  },
  {
    id: 'anest-003',
    name: 'Agulhas Gengivais Descartáveis Curtas 30G (cx 100un)',
    price: 65.00,
    description: 'Agulhas siliconizadas ultrafinas com bisel trifacetado para injeção suave e atraumática.',
    category: 'anestesicos',
    image: 'https://plus.unsplash.com/premium_photo-1668416938861-60bbde0598a5?w=600&auto=format&fit=crop&q=80',
    isRestricted: true,
    restrictionNotice: 'Material hospitalar de uso profissional restrito a profissionais habilitados.',
  },
  {
    id: 'anest-004',
    name: 'Seringa Carpule Metálica com Refluxo',
    price: 85.00,
    description: 'Seringa carpule autoclavável em latão cromado com sistema de aspiração manual segura.',
    category: 'anestesicos',
    image: 'https://plus.unsplash.com/premium_photo-1673728783079-86113edf0525?w=600&auto=format&fit=crop&q=80',
    isRestricted: true,
    restrictionNotice: 'Instrumento para injeção de anestésicos de uso exclusivamente odontológico.',
  },

  // 6. Ortodontia
  {
    id: 'orto-001',
    name: 'Brackets Metálicos Prescrição Roth 0.022 (kit 20un)',
    price: 180.00,
    description: 'Brackets metálicos com base em malha anatômica para colagem com alta retenção e baixo perfil.',
    category: 'ortodontia',
    image: 'https://plus.unsplash.com/premium_photo-1681997203595-e45e06abe034?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'orto-002',
    name: 'Fio Ortodôntico NiTi Termoativado Redondo (envelope 10un)',
    price: 95.00,
    description: 'Arcos de níquel-titânio com memória de forma e liberação contínua de forças biológicas leves.',
    category: 'ortodontia',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'orto-003',
    name: 'Elásticos Ortodônticos Intermaxilares 1/4 Médio (pacote 1000un)',
    price: 32.00,
    description: 'Elásticos intraorais em látex com calibragem uniforme de força para correções de classe II e III.',
    category: 'ortodontia',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'orto-004',
    name: 'Resina Fotopolimerizável para Colagem de Brackets',
    price: 145.00,
    description: 'Adesivo ortodôntico fotopolimerizável em seringa ergonômica com rastreador fluorescente sob luz UV.',
    category: 'ortodontia',
    image: 'https://images.unsplash.com/photo-1588776814610-a14d0dfc6f9e?w=600&auto=format&fit=crop&q=80',
  },
];

/**
 * Retorna todos os produtos vinculados a uma categoria específica.
 * @param categoryId - Identificador slug da categoria.
 */
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((product) => product.category === categoryId);
}

/**
 * Obtém os dados de uma categoria pelo seu ID.
 * @param categoryId - Identificador slug da categoria.
 */
export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((category) => category.id === categoryId);
}

/**
 * Retorna todas as categorias cadastradas.
 */
export function getAllCategories(): Category[] {
  return categories;
}

/**
 * Retorna todos os produtos cadastrados.
 */
export function getAllProducts(): Product[] {
  return products;
}
