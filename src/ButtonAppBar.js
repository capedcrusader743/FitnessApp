import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { auth, db, logout } from './firebaseConfig';
import { MenuItem } from '@mui/material';
import FadeMenu from './FadeMenu';

export default function ButtonAppBar(props) {


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
          <FadeMenu name={props.name}/>
          <Typography variant="h6" align='inherit' component="div" sx={{ flexGrow: 1 }}>
            FitTrack
          </Typography>
          <Button onClick={logout} color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
