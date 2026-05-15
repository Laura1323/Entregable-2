const BASE_URL = 'https://rickandmortyapi.com/api'
const CHARACTER_URL = `${BASE_URL}/character`

function buildCharacterUrl(params = {}) {
  const cleanParams = Object.entries(params).filter(([, value]) => value)
  const queryParams = new URLSearchParams(cleanParams)
  const queryString = queryParams.toString()

  return queryString ? `${CHARACTER_URL}?${queryString}` : CHARACTER_URL
}

async function fetchCharacters(url) {
  const response = await fetch(url)

  if (response.status === 404) {
    return {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    }
  }

  if (!response.ok) {
    throw new Error('No se pudieron cargar los personajes.')
  }

  return response.json()
}

async function fetchAllCharacters(url) {
  const firstPage = await fetchCharacters(url)
  const totalPages = firstPage.info.pages
  const pageRequests = []

  for (let page = 2; page <= totalPages; page += 1) {
    const nextUrl = new URL(url)
    nextUrl.searchParams.set('page', page)
    pageRequests.push(fetchCharacters(nextUrl.toString()))
  }

  const otherPages = await Promise.all(pageRequests)
  const allPages = [firstPage, ...otherPages]
  const characters = allPages.flatMap((page) => page.results)

  return {
    characters: characters.sort((first, second) => first.id - second.id),
    total: firstPage.info.count,
  }
}

export async function getCharacterById(id) {
  const response = await fetch(`${CHARACTER_URL}/${id}`)

  if (!response.ok) {
    throw new Error('No se pudo cargar el personaje.')
  }

  return response.json()
}

export async function getCharactersPage({ page = 1, name = '' } = {}) {
  const data = await fetchCharacters(buildCharacterUrl({ page, name }))

  return {
    characters: data.results,
    info: data.info,
  }
}

export async function getCharactersBySpeciesPage({ species, page = 1, name = '' }) {
  const data = await fetchCharacters(buildCharacterUrl({ species, page, name }))

  return {
    characters: data.results,
    info: data.info,
  }
}

export function getCharacters() {
  return fetchAllCharacters(buildCharacterUrl())
}

export function getCharactersBySpecies(species) {
  return fetchAllCharacters(buildCharacterUrl({ species }))
}
