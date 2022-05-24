import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import httpService from 'httpService';
import { Chip } from '@mui/material';

export default function TodoAutoComplete() {
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        httpService.get(`/todos.json`)
          .then((res) => {
            callback(res.data);
          });
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(selectedValue.length > 0 ? selectedValue : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (selectedValue.length > 0) {
          newOptions = selectedValue;
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [selectedValue, inputValue, fetch]);

  return (
    <Autocomplete
      multiple
      getOptionLabel={(option) => option.name }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={selectedValue}
      onChange={(event, newValue) => {
        setOptions(newValue.length > 0 ? [newValue, ...options] : options);
        setSelectedValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderTags={(selectedValue, getTagProps) =>
        selectedValue.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.name}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label="Add a todo" fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item xs>
                {option.name}
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
