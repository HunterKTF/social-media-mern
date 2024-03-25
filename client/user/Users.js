import * as React from 'react';
import {
  Paper, List, ListItemButton, ListItemAvatar,
  ListItemSecondaryAction, ListItemText, IconButton, Typography, Avatar
} from '@mui/material';
import { ArrowForward, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { list } from './api-user';

function Users() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    }
  }, []);

  return (
    <Paper elevation={4}>
      <Typography variant='h6'>All Users</Typography>
      <List dense>
        {users.map((item, i) => {
          return (
            <Link to={"/user/" + item._id} key={i}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
}

export default Users;
