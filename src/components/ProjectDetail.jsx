import React from "react";
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import SHARED_PROP_TYPES from "utils/sharedPropTypes";
import { useTranslation } from 'react-i18next';

export default function ProjectDetail(props) {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDestroy = () => {
    props.handleProjectDestroy(params.projectId, () => {
      setOpen(false);
      navigate("/projects");
    });
  };

  return (
    <>
      <Stack
        spacing={2}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3" component="div">
            {props.project.name}
          </Typography>
          <IconButton component={RouterLink} to={`/projects/${params.projectId}/edit`} sx={{ maxWidth: 160 }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Are you sure to delete Goal ${props.project.name}?`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`This action cannot be undone. This will permanently delete the goal ${props.project.name} and all its related tasks.`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>{t('Cancel')}</Button>
              <Button onClick={handleDestroy} color={'error'} autoFocus>
                {t('Confirm')}
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
        <Stack alignItems="center">
          <Typography variant="body1" gutterBottom>
            {(props.project.targetDate !== null) ? moment(props.project.targetDate).fromNow() : t('Indefinitely')}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}

ProjectDetail.propTypes = {
  project: SHARED_PROP_TYPES.project,
  handleProjectDestroy: PropTypes.func.isRequired,
};