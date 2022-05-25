import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { auth, db, logout } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {


  // var user = auth.currentUser;
  // const navigate = useNavigate();

  // const login = () => {
  //   navigate('/signin')
  // };

  // function handleClick() {
  //   if (user != null) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App Name
          </Typography>
          <Button onClick={logout} color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
