import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import throttle from 'lodash/throttle';

export default function ProjectAutoComplete(props) {
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const fetch = React.useMemo(
    () =>
      throttle(props.onSearch, 200),
    [props.onSearch],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(props.value ? [props.value] : []);
      return undefined;
    }

    fetch(inputValue, (results) => {
      if (active) {
        let newOptions = [];

        if (props.value) {
          newOptions = [props.value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions([...new Map(newOptions.map((option) => [option.id, option])).values()]);
      }
    });

    return () => {
      active = false;
    };
  }, [props.value, inputValue, fetch]);

  return (
    <Autocomplete
      getOptionLabel={(option) => option.name}
      filterOptions={(x) => x}
      options={options}
      noOptionsText="Type to search"
      autoComplete
      includeInputInList
      filterSelectedOptions
      isOptionEqualToValue={(option, value) => option.id === value.id}
      value={props.value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        props.onChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={props.label} required fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
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
