import {
  FormControl,
  InputLabel,
  NativeSelect,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const sxInput = { filter: 'invert(95%)' };

export default class SelectWithLabel extends Component {
  render() {
    const { id, label, options } = this.props;
    const labelId = `${id}-label`;
    return (
      <FormControl sx={ sxInput }>
        <InputLabel id={ labelId }>{label}</InputLabel>
        <NativeSelect
          { ...this.props }
          variant="filled"
          sx={ { minWidth: '200px' } }
        >
          {
            options.map((opt, index) => (
              <option
                value={ opt }
                key={ index }

              >
                {opt}
              </option>
            ))
          }

        </NativeSelect>
      </FormControl>
    );
  }
}

SelectWithLabel.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
