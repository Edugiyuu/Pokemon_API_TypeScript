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
import '../Styles/MenuUp.css'
import { createTheme, ThemeProvider} from '@mui/material';
import stars from "../Imgs/Icons/stars.png"
import register from "../Imgs/Icons/register.png"
type Anchor = 'top' | 'left' | 'bottom' | 'right';
const theme = createTheme({
  typography: {
    fontFamily: 'Rubik',
  },
});
export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  function handleLogin() {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
  }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    //(event: React.KeyboardEvent | React.MouseEvent) => {
    () => {
      
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      margin={1}
    >
      <ThemeProvider theme={theme}>
      <List>
       <ListItem>
            <Link to={`/profile`}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <ListItemText id='SideBar' primary={"User Profile"} />
                <Avatar sx={{ bgcolor: red[500], width: '30px', height: '30px',marginLeft:'10px' }}></Avatar>
                
              </div>
            </Link>
       
       </ListItem>
          <ListItem  >

            <Link to={`pokemon/favorites`}>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemText id="SideBar" primary={"Favorites"} />
                <img src={stars} style={{ width: '40px',marginLeft:'10px' }} alt="Stars" />
              </div>
            </Link>
            
          </ListItem>
          <ListItem>
          
            <Link to={`/register`}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ListItemText id='SideBar' primary={"Register"} />
              <img src={register} style={{ width: '30px',marginLeft:'10px' }}/>
              </div>
            </Link>
            
          </ListItem>
          <ListItem>
          
            <Link to={`/login`}>
              <ListItemText id='SideBar' primary={"Log In"} style={{fontFamily:'Rubik'}} />
            </Link>
            
          </ListItem>

          <ListItem>
          
            
            
          </ListItem>
      </List>
      
      <Divider />
      <Link to={`/login`} onClick={handleLogin}>
        <ListItemText  id='SideBar' primary={"Log out"} />
      </Link>
       
      </ThemeProvider>
   
    </Box>
  );

  return (
    <div  >
      {(['right'] as const).map((anchor) => (

        <React.Fragment key={anchor} >
          <Button onClick={toggleDrawer(anchor, true)}>{
            <Stack direction="row" spacing={2}>
              <Avatar className='AvatarHome' sx={{ bgcolor: "var(--cor-de-fundo)" }}></Avatar>
            </Stack>}
            </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{ ".MuiDrawer-paper": { backgroundColor: "var(--background-color)" }, ".MuiListItemText-primary": { color: "var(--text-color)" } }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}