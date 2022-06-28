import { Alert, Snackbar } from '@mui/material';
import { useAPIError } from 'hooks/useAPIError';
import { reduce } from 'lodash';
import React from 'react';

export default function APIErrorNotification() {
  const { error, removeError } = useAPIError();

  const handleSubmit = () => {
    removeError();
  };

  return (
    <>
      {error !== null &&
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleSubmit}>
          <Alert severity="error" sx={{ width: '100%' }} onClose={handleSubmit}>
            {
              reduce(error.message, function(result, value, key) {
                return result + value + '. ';
              }, '')
            }
          </Alert>
        </Snackbar>
      }
    </>
  )
}