import { useState } from 'react';
import himnos from './himnos.json';

export default function App() {
  const [categoria, setCategoria] = useState(null);       // 'Himnos', 'Alabanzas', 'Coros', 'Agrupaciones', 'Todos'
  const [subcategoria, setSubcategoria] = useState(null); // 'Coro Juventud', 'Grupo Ciclista', 'Coro Infantil', 'Clase Dorcas'
  const [busqueda, setBusqueda] = useState('');
  const [actual, setActual] = useState(null);
  const [tamanoTexto, setTamanoTexto] = useState(18);
  const [modoOscuro, setModoOscuro] = useState(true);

  // Listas de Secciones
  const seccionesPrincipales = ['Himnos', 'Alabanzas', 'Coros', 'Agrupaciones', 'Todos'];
  const agrupacionesList = ['Coro Juventud', 'Grupo Ciclista', 'Coro Infantil', 'Clase Dorcas'];

  // Categoría activa final para filtrar
  const categoriaFiltro = categoria === 'Agrupaciones' ? subcategoria : categoria;

  // Filtrado de cantos
  const filtrados = himnos.filter(h => {
    const coincideCategoria = categoria === 'Todos' || !categoriaFiltro || h.categoria === categoriaFiltro;
    const coincideBusqueda = h.id.toString().includes(busqueda) || h.titulo.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div className={`app-shell ${modoOscuro ? 'theme-dark' : 'theme-light'}`}>
      <header className="site-header">
        <div className="header-glow" aria-hidden="true" />
        <button
          onClick={() => setModoOscuro(!modoOscuro)}
          className="theme-toggle"
          aria-label={modoOscuro ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
          <span aria-hidden="true">{modoOscuro ? '☀' : '◐'}</span>
          <span>{modoOscuro ? 'Claro' : 'Oscuro'}</span>
        </button>
        <div className="brand-mark">
          <img src="/logoEECH.png" alt="Logo de la Iglesia EECH" />
        </div>
        <p className="eyebrow">Iglesia EECH · Pueblo Nuevo</p>
        <h1>Himnario Digital</h1>
        <p className="header-caption">Una colección para cantar y adorar juntos</p>
        <nav className="social-links" aria-label="Redes sociales de la iglesia">
          <a
            href="https://www.instagram.com/ieech_laja?stkn=MWNmcDNwaHJlODBxNQ=="
            target="_blank"
            rel="noreferrer"
            className="social-link instagram-link"
            aria-label="Visitar Instagram de la iglesia"
          >
            <span className="social-icon" aria-hidden="true">◎</span>
            <span>Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/share/1CSEiyT2Gv/?mibextid=wwXIfr"
            target="_blank"
            rel="noreferrer"
            className="social-link facebook-link"
            aria-label="Visitar Facebook de la iglesia"
          >
            <span className="social-icon facebook-icon" aria-hidden="true">f</span>
            <span>Facebook</span>
          </a>
        </nav>
      </header>

      <main className="content-area">

        {/* NIVEL 1: Menú Principal */}
        {!categoria && !actual && (
          <div className="view-stack view-enter">
            <div className="section-heading">
              <span className="section-kicker">Explora el himnario</span>
              <h2>¿Qué quieres cantar hoy?</h2>
              <p>Encuentra rápidamente himnos, alabanzas y coros.</p>
            </div>
            {seccionesPrincipales.map(item => (
              <button
                key={item}
                onClick={() => setCategoria(item)}
                className="nav-card"
              >
                <span className="nav-card-icon" aria-hidden="true">{item === 'Todos' ? '✦' : item === 'Agrupaciones' ? '♬' : '♪'}</span>
                <span className="nav-card-label">{item}</span>
              </button>
            ))}
          </div>
        )}

        {/* NIVEL 2: Submenú de Agrupaciones */}
        {categoria === 'Agrupaciones' && !subcategoria && !actual && (
          <div className="view-stack view-enter">
            <button 
              onClick={() => setCategoria(null)}
              className="back-link"
            >
              <span aria-hidden="true">←</span> Menú principal
            </button>

            <div className="section-heading compact-heading">
              <span className="section-kicker">Agrupaciones</span>
              <h2>Selecciona una agrupación</h2>
            </div>

            {agrupacionesList.map(agrup => {
              const cantidad = himnos.filter(h => h.categoria === agrup).length;
              return (
                <button
                  key={agrup}
                  onClick={() => setSubcategoria(agrup)}
                  className="nav-card group-card"
                >
                  {agrup === 'Grupo Ciclista' ? (
                    <img
                      src="/logo-grupo-ciclista.png"
                      alt="Emblema del Grupo Ciclista"
                      className="group-logo"
                    />
                  ) : agrup === 'Coro Juventud' ? (
                    <img
                      src="/CORO-Photoroom.png"
                      alt="Emblema del Coro Juventud"
                      className="group-logo"
                    />
                  ) : agrup === 'Coro Infantil' ? (
                    <img
                      src="/CORO INFANTIL-Photoroom.png"
                      alt="Emblema del Coro Infantil"
                      className="group-logo"
                    />
                  ) : agrup === 'Clase Dorcas' ? (
                    <img
                      src="/DORCAS.png"
                      alt="Emblema de la Clase Dorcas"
                      className="group-logo"
                    />
                  ) : (
                    <span className="nav-card-icon" aria-hidden="true">♬</span>
                  )}
                  <span className="nav-card-label">{agrup}</span>
                  <span className="count-pill">
                    {cantidad} {cantidad === 1 ? 'canto' : 'cantos'}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* NIVEL 3: Lista de Cantos y Buscador */}
        {categoria && (categoria !== 'Agrupaciones' || subcategoria) && !actual && (
          <div className="view-stack view-enter">
            <div className="list-toolbar">
              <button 
                onClick={() => {
                  if (categoria === 'Agrupaciones') {
                    setSubcategoria(null);
                  } else {
                    setCategoria(null);
                  }
                  setBusqueda('');
                }}
                className="back-link"
              >
                <span aria-hidden="true">←</span> Volver a {categoria === 'Agrupaciones' ? 'agrupaciones' : 'categorías'}
              </button>
              <span className="category-chip">
                {categoriaFiltro}
              </span>
            </div>

            <input 
              type="text" 
              placeholder="Buscar por número o título..." 
              className="search-box"
              value={busqueda} 
              onChange={(e) => setBusqueda(e.target.value)} 
            />

            <div className="song-list">
              {filtrados.length > 0 ? (
                filtrados.map(h => (
                  <button 
                    key={h.id} 
                    onClick={() => setActual(h)} 
                    className="song-row"
                  >
                    <span className="song-number">{String(h.id).padStart(2, '0')}</span>
                    <span className="song-title">{h.titulo}</span>
                    <span className="song-arrow" aria-hidden="true">→</span>
                  </button>
                ))
              ) : (
                <p className="empty-state">No hay cantos registrados en esta sección.</p>
              )}
            </div>
          </div>
        )}

        {/* NIVEL 4: Vista de la Letra */}
        {actual && (
          <article className="song-detail view-enter">
            <div className="detail-toolbar">
              <button 
                onClick={() => setActual(null)} 
                className="back-link"
              >
                <span aria-hidden="true">←</span> Volver a la lista
              </button>
              
              <div className="text-controls" aria-label="Tamaño del texto">
                <button 
                  onClick={() => setTamanoTexto(Math.max(14, tamanoTexto - 2))}
                  className="text-size-button"
                >
                  A-
                </button>
                <span className="text-size-value">{tamanoTexto}px</span>
                <button 
                  onClick={() => setTamanoTexto(Math.min(28, tamanoTexto + 2))}
                  className="text-size-button"
                >
                  A+
                </button>
              </div>
            </div>

            <div className="detail-heading">
              <span className="section-kicker">Canto {actual.id}</span>
              <h2>{actual.titulo}</h2>
            </div>
            <span className="category-chip detail-chip">
              {actual.categoria}
            </span>
            
            <p 
              style={{ fontSize: `${tamanoTexto}px` }}
              className="lyrics"
            >
              {actual.letra}
            </p>
          </article>
        )}
      </main>
      <footer className="site-footer">EECH Pueblo Nuevo · Felix Eicher 480 </footer>
    </div>
  );
}