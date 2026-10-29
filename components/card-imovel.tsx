'use client'

import Link from 'next/link'
import { Heart, MapPin } from 'lucide-react'
import { formatarPreco, indicadores, localizacao, type Imovel } from '@/lib/imoveis'
import { useFavoritos } from '@/lib/favoritos'

export function CardImovel({ imovel }: { imovel: Imovel }) {
  const { favoritos, alternar } = useFavoritos()
  const salvo = favoritos.includes(imovel.id)

  return (
    <article className="card">
      <div className="card-foto">
        <Link href={`/imoveis/${imovel.id}`} aria-label={imovel.titulo}>
          <img src={imovel.fotos[0]} alt={imovel.titulo} loading="lazy" />
        </Link>
        <div className="card-selos">
          <span className="selo selo-finalidade">{imovel.finalidade === 'Comprar' ? 'VENDA' : 'LOCAÇÃO'}</span>
          {imovel.selo && <span className="selo">{imovel.selo}</span>}
        </div>
        <button
          className={`card-favorito ${salvo ? 'salvo' : ''}`}
          onClick={() => alternar(imovel.id)}
          aria-label={salvo ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
          aria-pressed={salvo}
        >
          <Heart size={17} fill={salvo ? 'currentColor' : 'none'} />
        </button>
        <span className="card-codigo">COD {imovel.codigo}</span>
      </div>

      <div className="card-corpo">
        <span className="card-tipo">{imovel.tipo}</span>
        <h3><Link href={`/imoveis/${imovel.id}`}>{imovel.titulo}</Link></h3>
        <span className="card-local"><MapPin size={13} /> {localizacao(imovel)}</span>
        <div className="card-indicadores">
          {indicadores(imovel).map((item) => <span key={item.chave}>{item.valor}</span>)}
        </div>
        <div className="card-preco">
          {formatarPreco(imovel.preco, imovel.finalidade)}
          {imovel.condominio !== null && <small>Condomínio {formatarPreco(imovel.condominio)}</small>}
        </div>
      </div>
    </article>
  )
}
