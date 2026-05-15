import { useEffect, useState } from 'react'
import { getCharacterById } from '../services/api'

export function useCharacter(id) {
  const [state, setState] = useState({
    id: null,
    character: null,
    error: '',
    status: 'loading',
  })

  useEffect(() => {
    let active = true

    getCharacterById(id)
      .then((data) => {
        if (active) setState({ id, character: data, error: '', status: 'success' })
      })
      .catch((err) => {
        if (active) setState({ id, character: null, error: err.message, status: 'error' })
      })

    return () => {
      active = false
    }
  }, [id])

  return {
    character: state.id === id ? state.character : null,
    loading: state.id !== id || state.status === 'loading',
    error: state.id === id ? state.error : '',
  }
}
