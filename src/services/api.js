const BASE_URL = 'https://rickandmortyapi.com/api'
const CHARACTER_URL = `${BASE_URL}/character`

function buildCharacterUrl(params = {}) {
  const queryParams = new URLSearchParams(params)
  const queryString = queryParams.toString()

  return queryString ? `${CHARACTER_URL}?${queryString}` : CHARACTER_URL
}

async function fetchPage(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los personajes.')
  }

  return response.json()
}

async function fetchAllCharacters(url) {
  const firstPage = await fetchPage(url)
  const totalPages = firstPage.info.pages
  const pageRequests = []

  for (let page = 2; page <= totalPages; page += 1) {
    const nextUrl = new URL(url)
    nextUrl.searchParams.set('page', page)
    pageRequests.push(fetchPage(nextUrl.toString()))
  }

  const otherPages = await Promise.all(pageRequests)
  const allPages = [firstPage, ...otherPages]
  const characters = allPages.flatMap((page) => page.results)

  return {
    characters: characters.sort((first, second) => first.id - second.id),
    total: firstPage.info.count,
  }
}

// Obtener una sola página (20 personajes por página según API)
export async function getCharactersPage(page = 1) {
  const url = buildCharacterUrl({ page })
  const data = await fetchPage(url)

  return {
    characters: data.results,
    info: data.info,
  }
}

export async function getCharactersBySpeciesPage(species, page = 1) {
  const url = buildCharacterUrl({ species, page })
  const data = await fetchPage(url)

  return {
    characters: data.results,
    info: data.info,
  }
}

// Compatibilidad: funciones antiguas que descargan todo (menos eficiente)
export function getCharacters() {
  return fetchAllCharacters(buildCharacterUrl())
}

export function getCharactersBySpecies(species) {
  return fetchAllCharacters(buildCharacterUrl({ species }))
}
