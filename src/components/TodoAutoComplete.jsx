import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import throttle from 'lodash/throttle';
import httpService from 'httpService';
import { Chip } from '@mui/material';

export default function TodoAutoComplete(props) {
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
      setOptions(props.value.length > 0 ? props.value : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (props.value.length > 0) {
          newOptions = props.value;
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
  }, [props.value, inputValue, fetch]);

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
      value={props.value}
      onChange={(event, newValue) => {
        setOptions(newValue.length > 0 ? [newValue, ...options] : options);
        props.onChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.name}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label={props.label} fullWidth />
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
