'use client'

import { Heart } from 'lucide-react'
import { useFavoritos } from '@/lib/favoritos'

export function BotaoFavorito({ id }: { id: string }) {
  const { favoritos, alternar } = useFavoritos()
  const salvo = favoritos.includes(id)

  return (
    <button className="botao botao-contorno" type="button" onClick={() => alternar(id)} aria-pressed={salvo}>
      <Heart size={16} fill={salvo ? 'currentColor' : 'none'} /> {salvo ? 'Salvo nos favoritos' : 'Salvar nos favoritos'}
    </button>
  )
}
