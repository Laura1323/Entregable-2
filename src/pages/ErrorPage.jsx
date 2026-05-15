import { Link } from 'react-router-dom'
import '../styles/home.css'

function ErrorPage() {
  return (
    <section className="page error-page">
      <p className="page__eyebrow">Error 404</p>
      <h1>Pagina no encontrada</h1>
      <p>La ruta que intentas abrir no existe.</p>
      <Link className="button-link" to="/">
        Volver al inicio
      </Link>
    </section>
  )
}

export default ErrorPage
