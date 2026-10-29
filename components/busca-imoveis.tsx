'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { TIPOS, sugestoesBusca, type Finalidade } from '@/lib/imoveis'

type Props = {
  finalidadeInicial?: Finalidade
  tipoInicial?: string
  cidadeInicial?: string
  buscaInicial?: string
  compacta?: boolean
}

export function BuscaImoveis({ finalidadeInicial = 'Comprar', tipoInicial = '', cidadeInicial = '', buscaInicial = '', compacta }: Props) {
  const router = useRouter()
  const [finalidade, setFinalidade] = useState<Finalidade>(finalidadeInicial)
  const [tipo, setTipo] = useState(tipoInicial)
  const [cidade] = useState(cidadeInicial)
  const [busca, setBusca] = useState(buscaInicial)

  const enviar = (event: React.FormEvent) => {
    event.preventDefault()
    const parametros = new URLSearchParams({ finalidade })
    if (tipo) parametros.set('tipo', tipo)
    if (cidade) parametros.set('cidade', cidade)
    if (busca.trim()) parametros.set('busca', busca.trim())
    router.push(`/imoveis?${parametros}`)
  }

  return (
    <form className={`busca ${compacta ? 'busca-compacta' : ''}`} onSubmit={enviar}>
      <div className="busca-finalidade">
        {(['Comprar', 'Alugar'] as const).map((opcao) => (
          <button key={opcao} type="button" className={finalidade === opcao ? 'ativo' : ''} onClick={() => setFinalidade(opcao)}>{opcao}</button>
        ))}
      </div>

      <label>
        <span>Tipo de imóvel</span>
        <select value={tipo} onChange={(event) => setTipo(event.target.value)}>
          <option value="">Todos os tipos</option>
          {TIPOS.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>

      <label>
        <span>Cidade, bairro ou código</span>
        <input
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          list="sugestoes-busca"
          placeholder="Ex.: Balneário Gaivota, Centro ou TR101"
        />
        <datalist id="sugestoes-busca">
          {sugestoesBusca.map((item) => <option key={item} value={item} />)}
        </datalist>
      </label>

      <button className="botao botao-primario" type="submit"><Search size={17} /> Buscar imóveis</button>
    </form>
  )
}
