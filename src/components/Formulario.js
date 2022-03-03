import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';

import styled from '@emotion/styled';
import axios from 'axios';

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
  // State del listado de criptomonedas
  const [listaCripto, guardarListaCripto] = useState([]);

  // State para controlar errores en el formulario
  const [error, guardarError] = useState(false);

  // Listado de monedas y sus códigos
  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dolar estadounidense' },
    { codigo: 'MXN', nombre: 'Peso mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra esterlina' },
  ];

  // Custom hook para el select de las monedas
  const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);

  // Custom hook para el select de las criptomonedas
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    'Elige tu criptomoneda',
    '',
    listaCripto
  );

  // Ejecutar llamada a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

      const resultado = await axios.get(url);

      guardarListaCripto(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  // Cuando se envía el formulario
  const cotizarMoneda = e => {
    e.preventDefault();

    // Validar si ambos campos están llenos
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      guardarError(true);
      // Impedir que se siga ejecutando el código
      return;
    }

    // Pasar datos al componente principal para mostrar los datos
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type='submit' value='Calcular' />
    </form>
  );
};

Formulario.propTypes = {
  guardarMoneda: PropTypes.func.isRequired,
  guardarCriptomoneda: PropTypes.func.isRequired,
};

export default Formulario;
