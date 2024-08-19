import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import '../Styles/SideBar.css'
import { createTheme, ThemeProvider } from '@mui/material';
import Bar from "../Imgs/Icons/MenuBar.png"
type Anchor = 'top' | 'left' | 'bottom' | 'right';

const theme = createTheme({
  typography: {
    fontFamily: 'Rubik',
  }
});
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
          <ListItem  >

            <NavLink className={'BarHomeButtons'} to={`/`}>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemText id="SideBar" primary={"Home"} />
              </div>
            </NavLink>

          </ListItem>
          <ListItem>

            <NavLink className={'BarHomeButtons'} to={`/pokemon/types`}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemText id='SideBar' primary={"Types"} />
                {/* <img src={register} style={{ width: '30px', marginLeft: '10px' }} /> */}
              </div>
            </NavLink>

          </ListItem>

          <ListItem>

            <NavLink className={'BarHomeButtons'} to={`/pokemon/nature`}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemText id='SideBar' primary={"Nature"} />
                {/* <img src={register} style={{ width: '30px', marginLeft: '10px' }} /> */}
              </div>
            </NavLink>

          </ListItem>

          <ListItem>

            <NavLink className={'BarHomeButtons'} to={`/pokemon/stats`}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemText id='SideBar' primary={"Stats"} />
                {/* <img src={register} style={{ width: '30px', marginLeft: '10px' }} /> */}
              </div>
            </NavLink>

          </ListItem>
        </List>

        <Divider />

      </ThemeProvider>

    </Box>
  );

  return (
    <div  >
      {(['left'] as const).map((anchor) => (

        <React.Fragment key={anchor}  >
          <Button onClick={toggleDrawer(anchor, true)}>{
            <Stack direction="row" spacing={2}>
              <img
                src={Bar}
                style={{ width: "70px" }}
              />
            </Stack>}
            </Button>
          <Drawer
          className='test'
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