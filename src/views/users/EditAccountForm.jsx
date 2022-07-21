import { Button, Container, FormControl, Grid, Select, MenuItem, InputLabel, TextField, Typography } from "@mui/material";
import httpService from "services/httpService";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAPIError } from "hooks/useAPIError";
import { useTranslation } from 'react-i18next';

export default function EditAccountForm() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    imageUrl: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const { addError } = useAPIError();
  const [preferedlanguage, setPreferedlanguage] = useState(i18n.language);

  useEffect(() => {
    httpService.get('/me.json')
      .then((response) => {
        setUser(response.data);
      })
      .catch(function (error) {
        addError(error.response.data, error.response.status);
        console.log(error);
      });
  }, [addError]);

  function handleChange(event) {
    setUser((user) => ({
      ...user,
      [event.target.name]: event.target.value
    }));
  }

  function handleLanguageChange(event) {
    i18n.changeLanguage(event.target.value)
      .then((t) => {
        setPreferedlanguage(event.target.value)
      });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const userData = {
      name: user.name,
      image_url: user.imageUrl,
    };

    httpService.put(`/me.json`, userData)
      .then((response) => {
        setUser(response.data);
      })
      .catch(function (error) {
        setError(error)
        addError(error.response.data, error.response.status);
        console.log(error);
      })
      .then(() => {
        setSubmitted(true);
      });
  }

  return (
    <div>
      {(submitted && error === null) && (
        <Navigate to={`/account`} />
      )}
      <Container
        sx={{
          maxWidth: { xs: 600 },
          mt: 2
        }}
      >
        <Typography variant="h3" component="div" gutterBottom>
          {t('Edit Account')}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="stretch" justifyContent="center" direction="column">
            <Grid item>
              <TextField
                required
                label={t('Username')}
                name="name"
                margin="normal"
                fullWidth
                value={user.name || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label={t("Image URL")}
                name="imageUrl"
                margin="normal"
                fullWidth
                value={user.imageUrl || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <FormControl margin="normal" fullWidth>
                <InputLabel>{t('Prefered Language')}</InputLabel>
                <Select
                  name="preferedlanguage"
                  label="Prefered Language"
                  value={preferedlanguage}
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="en">{t('en')}</MenuItem>
                  <MenuItem value="cn">{t('cn')}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl margin="normal">
                <Button variant="contained" type="submit">{t('Submit')}</Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
