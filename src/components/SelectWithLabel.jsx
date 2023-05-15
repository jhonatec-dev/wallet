import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class SelectWithLabel extends Component {
  render() {
    const { id, label, options } = this.props;
    const labelId = `${id}-label`;
    return (
      <FormControl>
        <InputLabel id={ labelId }>{label}</InputLabel>
        <Select
          { ...this.props }
          variant="filled"
          labelId={ labelId }
          sx={ { minWidth: '200px' } }
        >
          {
            options.map((opt, index) => (
              <MenuItem
                value={ opt }
                key={ index }
              >
                {opt}
              </MenuItem>
            ))
          }

        </Select>
      </FormControl>
    );
  }
}

SelectWithLabel.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
