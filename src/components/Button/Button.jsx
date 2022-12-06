import React from 'react';
import PropTypes from 'prop-types';
import { ButtonStyle } from './Button.styled';

export const Button = ({ onClick, children }) => {
  return (
    <ButtonStyle type="button" onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};
