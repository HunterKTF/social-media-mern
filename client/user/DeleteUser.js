import * as React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DeleteIcon } from '@mui/icons-material';
import auth from './../auth/auth-helper';
import remove from './api-user';
import { Navigate } from 'react-router-dom';


