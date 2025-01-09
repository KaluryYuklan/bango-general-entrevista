import React, { useState } from 'react';

const App = () => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);

  const obtenerPersonajes = (numeroPagina = 1) => {
    setCargando(true);
    setError(null);
    fetch(`https://rickandmortyapi.com/api/character?page=${numeroPagina}`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error en la solicitud');
        }
        return respuesta.json();
      })
      .then((datos) => {
        setDatos(datos);
        setCargando(false);
      })
      .catch((error) => {
        setError(error);
        setCargando(false);
      });
  };

  const cambiarPagina = (nuevaPagina) => {
    setPagina(nuevaPagina); 
    obtenerPersonajes(nuevaPagina);
  };

  return (
    <div
      className='container w-75'
    >
      <nav
        className='d-flex justify-content-between'
      >
        <h1>Personajes de Rick & Morty</h1>


        {/* Botón inicial para cargar los datos */}
        {!datos && (
          <button
            className='btn btn-success pt-0 mt-2'
            onClick={() => obtenerPersonajes(pagina)} disabled={cargando}>
            {cargando ? 'Cargando...' : 'Cargar Personajes'}
          </button>
        )}

        {/* Mostrar error si ocurre */}
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      </nav>

      {!datos && (
        <>
        
        </>
      )}

      {/* Mostrar los personajes */}
      {datos && (
        <div className="container">
          <div className="row">
            {datos.results.map((personaje) => (
              <div className="col-md-4 mb-4" key={personaje.id}>
                <div className="card h-100 text-center">
                  <img
                    src={personaje.image}
                    alt={personaje.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{personaje.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>



          {/* Botones de paginado */}
          <div>
            <button
              className='btn btn-secondary'
              onClick={() => cambiarPagina(pagina - 1)}
              disabled={pagina === 1 || cargando} // Deshabilita si está en la primera página
            >
              Anterior
            </button>
            <span style={{ margin: '0 10px' }}>Página {pagina}</span>
            <button
              className='btn btn-primary'
              onClick={() => cambiarPagina(pagina + 1)}
              disabled={!datos.info.next || cargando} // Deshabilita si no hay más páginas
            >
              Siguiente
            </button>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default App;
