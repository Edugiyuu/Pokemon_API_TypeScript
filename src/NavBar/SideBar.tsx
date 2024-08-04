import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { red } from '@mui/material/colors';
import '../Styles/SideBar.css'

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
    function handleLogin() {
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
    }

  const list = (anchor: Anchor) => (
    <Box
      
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      margin={1}
    >
      <List>
       
          <ListItem  >
          
            <Link to={`pokemon/favorites`}>
              <ListItemText id='SideBar' primary={"Favorites"} />
            </Link>
            
          </ListItem>
          <ListItem>
          
            <Link to={`/register`}>
              <ListItemText id='SideBar'  primary={"Register"} />
            </Link>
            
          </ListItem>
          <ListItem>
          
            <Link to={`/login`}>
              <ListItemText id='SideBar' primary={"Log In"} />
            </Link>
            
          </ListItem>

          <ListItem>
          
            <Link to={`/profile`}>
              <ListItemText id='SideBar' primary={"User Profile"} />
            </Link>
            
          </ListItem>
      </List>
      <Divider />
      <Link to={`/login`} onClick={handleLogin}>
        <ListItemText  id='SideBar' primary={"Log out"} />
      </Link>
       
        
   
    </Box>
  );

  return (
    <div  >
      {(['right'] as const).map((anchor) => (

        <React.Fragment key={anchor} >
          <Button onClick={toggleDrawer(anchor, true)}>{
            <Stack direction="row" spacing={2}>
              <Avatar sx={{ bgcolor: red[500] }}>P</Avatar>
            </Stack>}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}