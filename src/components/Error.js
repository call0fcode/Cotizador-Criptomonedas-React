import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';

const MensajeError = styled.p`
  color: #fff;
  background-color: #b7322c;
  padding: 1rem;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  font-family: 'Bebas Neue', cursive;
`;

const Error = ({ mensaje }) => {
  return <MensajeError>{mensaje}</MensajeError>;
};

Error.propTypes = {
  mensaje: PropTypes.string.isRequired,
};

export default Error;
