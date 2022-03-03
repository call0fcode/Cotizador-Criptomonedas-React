import React, { useState, useEffect } from 'react';

import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

import styled from '@emotion/styled';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 3rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin: 80px 0 50px;

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
  }
`;

function App() {
  // States de monedas y criptomonedas para mostrar en el resultado
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');

  // State con el valor de la coticación
  const [resultado, guardarResultado] = useState({});

  // State para comprobar si se está cargando una cotización
  const [cargando, guardarCargando] = useState(false);

  // Recargar el componente cuando tengamos los datos de monedas y criptomonedas
  useEffect(() => {
    // Evitamos la ejecución al inicio
    if (moneda === '') return;

    // Consultar API para obtener la cotización
    const cotizarCriptomonedaAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      // Mostrar spinner ya que estamos obteniendo los datos desde la API
      guardarCargando(true);

      // Ocultar spinner y mostrar el resultado
      setTimeout(() => {
        // Ocultar spinner
        guardarCargando(false);

        // Guardar coticación en el state
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    };

    cotizarCriptomonedaAPI();
  }, [moneda, criptomoneda]);

  // Carga condicional de componentes
  const componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt='Imagen criptomonedas' />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
