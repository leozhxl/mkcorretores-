'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type Props = {
  fotos: string[]
  titulo: string
  /** 'destaque' = mosaico do topo da ficha. 'grade' = todas as fotos em miniaturas. */
  variante?: 'destaque' | 'grade'
}

/** Galeria do imóvel: clique em qualquer foto abre a imagem ampliada com navegação. */
export function GaleriaImovel({ fotos, titulo, variante = 'destaque' }: Props) {
  const [aberta, setAberta] = useState<number | null>(null)

  const fechar = useCallback(() => setAberta(null), [])
  const navegar = useCallback(
    (passo: number) => setAberta((atual) => (atual === null ? null : (atual + passo + fotos.length) % fotos.length)),
    [fotos.length],
  )

  useEffect(() => {
    if (aberta === null) return

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') fechar()
      if (evento.key === 'ArrowRight') navegar(1)
      if (evento.key === 'ArrowLeft') navegar(-1)
    }

    document.addEventListener('keydown', aoTeclar)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', aoTeclar)
      document.body.style.overflow = ''
    }
  }, [aberta, fechar, navegar])

  const visiveis = variante === 'destaque' ? fotos.slice(0, 5) : fotos
  const restantes = fotos.length - visiveis.length

  return <>
    <div className={variante === 'destaque' ? 'ficha-galeria' : 'ficha-miniaturas'}>
      {visiveis.map((foto, indice) => (
        <figure key={foto}>
          <button type="button" onClick={() => setAberta(indice)} aria-label={`Ampliar foto ${indice + 1} de ${fotos.length}`}>
            <img src={foto} alt={`${titulo} — foto ${indice + 1}`} loading={indice === 0 ? 'eager' : 'lazy'} />
            {indice === visiveis.length - 1 && restantes > 0 && <span className="mais">+{restantes} fotos</span>}
          </button>
        </figure>
      ))}
    </div>

    {aberta !== null && (
      <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Fotos — ${titulo}`} onClick={fechar}>
        <button type="button" className="lightbox-fechar" onClick={fechar} aria-label="Fechar">
          <X size={22} />
        </button>

        {fotos.length > 1 && (
          <button
            type="button"
            className="lightbox-seta lightbox-anterior"
            onClick={(evento) => { evento.stopPropagation(); navegar(-1) }}
            aria-label="Foto anterior"
          >
            <ChevronLeft size={26} />
          </button>
        )}

        <img
          src={fotos[aberta]}
          alt={`${titulo} — foto ${aberta + 1} de ${fotos.length}`}
          onClick={(evento) => evento.stopPropagation()}
        />

        {fotos.length > 1 && (
          <button
            type="button"
            className="lightbox-seta lightbox-proxima"
            onClick={(evento) => { evento.stopPropagation(); navegar(1) }}
            aria-label="Próxima foto"
          >
            <ChevronRight size={26} />
          </button>
        )}

        <span className="lightbox-contador">{aberta + 1} / {fotos.length}</span>
      </div>
    )}
  </>
}
