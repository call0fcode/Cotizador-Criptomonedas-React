import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 0.8rem;
  appearance: none;
  border-radius: 10px;
  border: none;
`;

const useMoneda = (label, stateInicial, opciones) => {
  // State para el custom hook
  const [state, actualizarState] = useState(stateInicial);

  const SelectMoneda = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select onChange={e => actualizarState(e.target.value)} value={state}>
        <option value=''>- Seleccione -</option>
        {opciones.map(opcion => (
          <option key={opcion.codigo} value={opcion.codigo}>
            {opcion.nombre}
          </option>
        ))}
      </Select>
    </Fragment>
  );

  // Este hook retorna el state, la interfaz y función que modifica el state
  return [state, SelectMoneda, actualizarState];
};

export default useMoneda;
