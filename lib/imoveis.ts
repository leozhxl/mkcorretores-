export type Finalidade = 'Comprar' | 'Alugar'

/** Tipos usados no menu e nos filtros. Adicione novos conforme o portfólio crescer. */
export const TIPOS = ['Apartamento', 'Na planta', 'Casa', 'Terreno', 'Sala comercial', 'Galpão'] as const
export type Tipo = (typeof TIPOS)[number]

export type Imovel = {
  id: string
  /** Código divulgado ao cliente. Usado na busca e na ficha. */
  codigo: string
  titulo: string
  finalidade: Finalidade
  tipo: Tipo
  bairro: string
  cidade: string
  estado: string
  /** Etiqueta extra sobre a foto (ex.: OPORTUNIDADE). Opcional. */
  selo?: string
  /** Aparece no carrossel de oportunidades da home. */
  destaque: boolean
  /** Preço em reais. Use null quando o valor for sob consulta. */
  preco: number | null
  /** Valor de condomínio mensal, quando houver. */
  condominio: number | null
  /** Valor do IPTU mensal, quando houver. */
  iptu: number | null
  areaTotal: number | null
  areaConstruida: number | null
  dormitorios: number | null
  suites: number | null
  banheiros: number | null
  vagas: number | null
  descricao: string
  caracteristicas: string[]
  fotos: string[]
  /** Consulta usada no mapa do Google. */
  mapa: string
}

export const imoveis: Imovel[] = [
  {
    id: 'terreno-sao-jose',
    codigo: 'TR102',
    titulo: 'Terreno comercial com estrutura na BR-101',
    finalidade: 'Comprar',
    tipo: 'Terreno',
    bairro: 'São José',
    cidade: 'Sombrio',
    estado: 'SC',
    selo: 'OPORTUNIDADE',
    destaque: true,
    preco: 17500000,
    condominio: null,
    iptu: null,
    areaTotal: null,
    areaConstruida: null,
    dormitorios: null,
    suites: null,
    banheiros: null,
    vagas: null,
    descricao:
      'Terreno comercial de grande porte às margens da BR-101, com estrutura construída pronta para operação: prédio administrativo de dois pavimentos, galpões em sequência, residência de apoio, pátio pavimentado e ampla área verde. Localização estratégica entre a rodovia e o bairro São José, em Sombrio, cercada por indústrias, centros de distribuição e comércio consolidado.',
    caracteristicas: [
      'Frente para a BR-101, com alta visibilidade',
      'Prédio administrativo de dois pavimentos',
      'Galpões em sequência com portões independentes',
      'Residência de apoio no terreno',
      'Pátio pavimentado para manobra e carga',
      'Área verde e recuos em todo o perímetro',
      'Acesso por via secundária, sem depender da rodovia',
      'Entorno industrial e logístico consolidado',
    ],
    fotos: Array.from({ length: 12 }, (_, i) => `/imoveis/terreno-sao-jose/${i + 1}.jpg`),
    mapa: 'Marginal BR-101, São José, Sombrio, SC',
  },
  {
    id: 'terreno-gaivota',
    codigo: 'TR101',
    titulo: 'Terreno de esquina no centro de Balneário Gaivota',
    finalidade: 'Comprar',
    tipo: 'Terreno',
    bairro: 'Centro',
    cidade: 'Balneário Gaivota',
    estado: 'SC',
    destaque: true,
    preco: 1600000,
    condominio: null,
    iptu: null,
    areaTotal: 1200,
    areaConstruida: null,
    dormitorios: null,
    suites: null,
    banheiros: null,
    vagas: null,
    descricao:
      'Terreno de esquina com 1.200 m² no centro de Balneário Gaivota, em quadra plana e totalmente urbanizada. Duas frentes para rua — asfalto em uma delas e calçamento na outra —, com meio-fio, calçada, iluminação pública e rede elétrica no local. Entorno residencial consolidado, a poucos minutos da praia, com comércio e serviços no quarteirão. Área limpa e cercada, pronta para construir residência, prédio ou ponto comercial.',
    caracteristicas: [
      'Terreno de esquina com duas frentes para rua',
      '1.200 m² em quadra plana',
      'Rua asfaltada e rua calçada',
      'Meio-fio, calçada e iluminação pública',
      'Água e energia elétrica disponíveis',
      'Área limpa e cercada',
      'Centro, próximo a comércio e serviços',
      'Poucos minutos da praia',
    ],
    fotos: Array.from({ length: 7 }, (_, i) => `/imoveis/terreno-gaivota/${i + 1}.jpg`),
    mapa: 'Avenida Alvin Manoel Cardoso, Centro, Balneário Gaivota, SC',
  },
  {
    id: 'casa-jardim-ultra-mar',
    codigo: 'TR103',
    titulo: 'Casa de três quartos no Jardim Ultra Mar',
    finalidade: 'Comprar',
    tipo: 'Casa',
    bairro: 'Jardim Ultra Mar',
    cidade: 'Balneário Gaivota',
    estado: 'SC',
    destaque: false,
    preco: null,
    condominio: null,
    iptu: null,
    areaTotal: 300,
    areaConstruida: null,
    dormitorios: 3,
    suites: null,
    banheiros: null,
    vagas: 1,
    descricao:
      'Casa em terreno de 300 m² no Jardim Ultra Mar, em Balneário Gaivota. São três quartos, sala, cozinha de alvenaria, área de serviço e garagem aberta coberta ao lado da casa. Terreno plano e gramado, com pátio livre na frente e nos fundos, cercado e com acesso direto para o carro. Bairro residencial tranquilo, com ruas abertas e infraestrutura urbana no local.',
    caracteristicas: [
      'Três quartos',
      'Sala',
      'Cozinha de alvenaria',
      'Área de serviço',
      'Garagem aberta coberta',
      'Terreno de 300 m², plano e gramado',
      'Pátio livre na frente e nos fundos',
      'Bairro residencial tranquilo',
    ],
    fotos: Array.from({ length: 2 }, (_, i) => `/imoveis/casa-jardim-ultra-mar/${i + 1}.jpg`),
    mapa: 'Jardim Ultra Mar, Balneário Gaivota, SC',
  },
  {
    id: 'casa-rua-nova',
    codigo: 'CS102',
    titulo: 'Casa de quatro quartos em terreno de 1.000 m²',
    finalidade: 'Comprar',
    tipo: 'Casa',
    bairro: 'Rua Nova',
    cidade: 'Balneário Gaivota',
    estado: 'SC',
    destaque: true,
    preco: 500000,
    condominio: null,
    iptu: null,
    areaTotal: 1000,
    areaConstruida: null,
    dormitorios: 4,
    suites: null,
    banheiros: 2,
    vagas: 1,
    descricao:
      'Casa em terreno de 1.000 m² na Rua Nova, em Balneário Gaivota. São quatro quartos, dois banheiros, sala e cozinha grande, com varanda ao redor de toda a casa. O terreno é plano, gramado e murado, com portão de acesso para carro, garagem fechada e um pátio amplo e arborizado, com palmeiras e árvores de sombra. Rua asfaltada, tranquila, em bairro residencial de lotes grandes.',
    caracteristicas: [
      'Quatro quartos',
      'Dois banheiros',
      'Sala',
      'Cozinha grande',
      'Varanda ao redor da casa',
      'Garagem fechada',
      'Terreno de 1.000 m², plano e murado',
      'Pátio amplo e arborizado',
      'Rua asfaltada em bairro residencial',
    ],
    fotos: Array.from({ length: 5 }, (_, i) => `/imoveis/casa-rua-nova/${i + 1}.jpg`),
    mapa: 'Rua Nova, Balneário Gaivota, SC',
  },
  {
    id: 'casa-rua-nova-cs106',
    codigo: 'CS106',
    titulo: 'Casa de três quartos na Rua Nova',
    finalidade: 'Comprar',
    tipo: 'Casa',
    bairro: 'Rua Nova',
    cidade: 'Balneário Gaivota',
    estado: 'SC',
    destaque: false,
    preco: 285000,
    condominio: null,
    iptu: null,
    areaTotal: null,
    areaConstruida: null,
    dormitorios: 3,
    suites: null,
    banheiros: 1,
    vagas: null,
    descricao:
      'Casa na Rua Nova, em Balneário Gaivota, com três quartos, sala, cozinha, banheiro e lavanderia. Nos fundos há uma área coberta com piso cerâmico e churrasqueira de alvenaria, voltada para o quintal, além de uma edícula de alvenaria independente. O terreno é murado em todo o perímetro, com portão de grade, corredores laterais livres nos dois lados e pátio amplo com árvores frutíferas. Rua tranquila, de bairro residencial com lotes grandes.',
    caracteristicas: [
      'Três quartos',
      'Sala',
      'Cozinha',
      'Banheiro',
      'Lavanderia',
      'Varanda coberta na entrada',
      'Área coberta com piso cerâmico nos fundos',
      'Churrasqueira de alvenaria',
      'Edícula de alvenaria nos fundos',
      'Terreno murado com portão de grade',
      'Pátio arborizado, com árvores frutíferas',
      'Corredores laterais livres nos dois lados',
      'Rua tranquila em bairro residencial',
    ],
    fotos: Array.from({ length: 10 }, (_, i) => `/imoveis/casa-rua-nova-cs106/${i + 1}.jpg`),
    mapa: 'Rua Nova, Balneário Gaivota, SC',
  },
  {
    id: 'terreno-centro-sombrio',
    codigo: 'TR104',
    titulo: 'Terreno no centro de Sombrio, atrás da escola Geração Ativa',
    finalidade: 'Comprar',
    tipo: 'Terreno',
    bairro: 'Centro',
    cidade: 'Sombrio',
    estado: 'SC',
    destaque: false,
    preco: 495000,
    condominio: null,
    iptu: null,
    areaTotal: 536.5,
    areaConstruida: null,
    dormitorios: null,
    suites: null,
    banheiros: null,
    vagas: null,
    descricao:
      'Terreno de 536,50 m² (14 x 37 m) no centro de Sombrio, nos fundos da escola Geração Ativa. Lote plano, limpo e murado em todo o perímetro, com frente para rua calçada, meio-fio, calçada e toda a infraestrutura urbana no local. Quadra consolidada, cercada por residências e prédios, a poucos passos do comércio e dos serviços do centro. Pronto para construir residência, prédio ou ponto comercial.',
    caracteristicas: [
      '536,50 m² — 14 m de frente por 37 m de fundos',
      'Lote plano e limpo',
      'Murado em todo o perímetro',
      'Frente para rua calçada, com meio-fio e calçada',
      'Água e energia elétrica na rua',
      'Nos fundos da escola Geração Ativa',
      'Centro, próximo a comércio e serviços',
      'Quadra residencial consolidada',
    ],
    fotos: Array.from({ length: 3 }, (_, i) => `/imoveis/terreno-centro-sombrio/${i + 1}.jpg`),
    mapa: 'Centro, Sombrio, SC',
  },
]

export function getImovel(id: string) {
  return imoveis.find((imovel) => imovel.id === id)
}

export function formatarPreco(preco: number | null, finalidade?: Finalidade) {
  if (preco === null) return 'Valor sob consulta'
  const valor = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
  return finalidade === 'Alugar' ? `${valor}/mês` : valor
}

export function formatarArea(area: number | null) {
  return area === null ? 'Sob consulta' : `${area.toLocaleString('pt-BR')} m²`
}

export function localizacao(imovel: Imovel) {
  return `${imovel.bairro}, ${imovel.cidade} - ${imovel.estado}`
}

/** Indicadores exibidos no rodapé do card — só o que o imóvel realmente tem. */
export function indicadores(imovel: Imovel) {
  const itens: { chave: string; valor: string }[] = []
  if (imovel.dormitorios) itens.push({ chave: 'dormitorios', valor: `${imovel.dormitorios} ${imovel.dormitorios > 1 ? 'dorms' : 'dorm'}` })
  if (imovel.banheiros) itens.push({ chave: 'banheiros', valor: `${imovel.banheiros} ${imovel.banheiros > 1 ? 'banheiros' : 'banheiro'}` })
  if (imovel.vagas) itens.push({ chave: 'vagas', valor: `${imovel.vagas} ${imovel.vagas > 1 ? 'vagas' : 'vaga'}` })
  if (imovel.areaTotal) itens.push({ chave: 'area', valor: formatarArea(imovel.areaTotal) })
  if (itens.length === 0) itens.push({ chave: 'tipo', valor: imovel.tipo })
  return itens
}

export type Filtros = {
  finalidade?: Finalidade
  tipo?: string
  cidade?: string
  busca?: string
}

/** Tira acentos e caixa alta para que "balneario" encontre "Balneário". */
function normalizar(valor: string) {
  return valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

/** Todo o texto pesquisável de um imóvel, já normalizado. */
function textoBuscavel(imovel: Imovel) {
  return normalizar(
    [
      imovel.codigo,
      imovel.titulo,
      imovel.bairro,
      imovel.cidade,
      imovel.estado,
      imovel.tipo,
      imovel.finalidade === 'Alugar' ? 'alugar aluguel locacao' : 'comprar venda',
      imovel.descricao,
      imovel.caracteristicas.join(' '),
    ].join(' '),
  )
}

/**
 * Busca por cidade, bairro, tipo, código, descrição ou características.
 * Cada palavra digitada precisa aparecer em algum lugar do anúncio, em qualquer ordem.
 */
export function filtrarImoveis({ finalidade, tipo, cidade, busca }: Filtros) {
  const termos = normalizar(busca?.trim() ?? '').split(/\s+/).filter(Boolean)

  // Código exato tem prioridade: "TR 101" devolve só o TR101, e não tudo que cita "101".
  const codigoBuscado = termos.join('')
  const porCodigo = imoveis.find((imovel) => normalizar(imovel.codigo) === codigoBuscado)
  if (porCodigo) {
    const passaNosFiltros =
      (!finalidade || porCodigo.finalidade === finalidade) &&
      (!tipo || porCodigo.tipo === tipo) &&
      (!cidade || porCodigo.cidade === cidade)
    if (passaNosFiltros) return [porCodigo]
  }

  return imoveis.filter((imovel) => {
    if (finalidade && imovel.finalidade !== finalidade) return false
    if (tipo && imovel.tipo !== tipo) return false
    if (cidade && imovel.cidade !== cidade) return false
    if (termos.length === 0) return true

    const texto = textoBuscavel(imovel)
    // Sem espaços, para que "TR 101" e "tr101" encontrem o mesmo imóvel.
    const colado = texto.replace(/\s+/g, '')
    return termos.every((termo) => texto.includes(termo) || colado.includes(termo.replace(/\s+/g, '')))
  })
}

/** Sugestões do campo de busca: cidades, bairros e códigos já cadastrados. */
export const sugestoesBusca = [
  ...new Set(imoveis.flatMap((imovel) => [imovel.cidade, imovel.bairro, imovel.codigo])),
].sort()

/** Tipos que existem no portfólio para a finalidade — alimenta o menu Comprar/Alugar. */
export function tiposDisponiveis(finalidade?: Finalidade) {
  const lista = finalidade ? imoveis.filter((imovel) => imovel.finalidade === finalidade) : imoveis
  return TIPOS.filter((tipo) => lista.some((imovel) => imovel.tipo === tipo))
}

export const cidadesAtendidas = [...new Set(imoveis.map((imovel) => imovel.cidade))].sort()

/** Cidades com a contagem real de imóveis cadastrados. */
export function cidadesComTotal(finalidade?: Finalidade) {
  return cidadesAtendidas
    .map((cidade) => {
      const lista = imoveis.filter((imovel) => imovel.cidade === cidade && (!finalidade || imovel.finalidade === finalidade))
      return { cidade, estado: lista[0]?.estado ?? 'SC', total: lista.length }
    })
    .filter((item) => item.total > 0)
}

export const destaques = imoveis.filter((imovel) => imovel.destaque)
