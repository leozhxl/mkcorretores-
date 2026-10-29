/**
 * Dados institucionais do site. Tudo aqui aparece publicamente —
 * só preencha com informação verdadeira e verificável.
 */
export const site = {
  nome: 'Riko Imobiliária',
  slogan: 'MK Corretores · Transformando sonhos em realidade',
  email: 'mkcorretores7@gmail.com',
  /** Endereço da matriz. Enquanto vazio, não é exibido. */
  endereco: '',
  /** Telefone fixo. Enquanto vazio, não é exibido. */
  telefone: '',
  whatsappVendas: { numero: '5548999083030', exibicao: '(48) 9 9908-3030' },
  /** Atendimento de locação. Enquanto o número estiver vazio, só o de vendas aparece. */
  whatsappLocacao: { numero: '', exibicao: '' },
  instagram: 'https://www.instagram.com/mkcorretores/',
  instagramHandle: '@mkcorretores',
  facebook: '',
  /** Número de registro no CRECI. Enquanto vazio, não é exibido no site. */
  creci: '',
  /** Anos de atuação. Enquanto null, a métrica não é exibida. */
  anosDeMercado: null as number | null,
  /** Quantidade de corretores na equipe. Enquanto null, não é exibida. */
  corretores: null as number | null,
}

export function linkWhatsApp(mensagem: string, canal: 'vendas' | 'locacao' = 'vendas') {
  const destino = canal === 'locacao' && site.whatsappLocacao.numero ? site.whatsappLocacao.numero : site.whatsappVendas.numero
  return `https://wa.me/${destino}?text=${encodeURIComponent(mensagem)}`
}
