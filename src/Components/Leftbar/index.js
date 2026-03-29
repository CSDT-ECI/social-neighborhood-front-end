import "./leftbar.css";
import {useState,useEffect,useCallback} from 'react'
import Avatar from '@mui/material/Avatar';

import Divider from '@material-ui/core/Divider';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import MapsHomeWorkTwoToneIcon from '@mui/icons-material/MapsHomeWorkTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Exit from '@mui/icons-material/ExitToApp';
import axios from 'axios';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

export default function Leftbar({user,changeSection,conjunto,vivienda}) {
  const [open, setOpen] = useState(false);
  const [nConjunto, setnConjunto] = useState([]);

    const fetchData = useCallback(async () => {
    await axios.get(`${window.$dir}social/conjuntoById/${conjunto?.idconjunto}`).then(res =>{  
          const res2 = res.data 
          console.log(res2)       
          setnConjunto(res2.nombre)
      }).catch(
          e =>{console.log("Error: :c "+e)}
      )
  },[conjunto?.idconjunto])

  useEffect(()=>{
  fetchData()
  },[fetchData])


  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="drawer" >
      <div className={styles.toolbar} />
      <Divider />
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Avatar
            alt={user.nombres}
            src={"/people/"+user.nombrefoto}
            sx={{ width: 156, height: 156 }}
          />
          <div className="profileInfo">
              <h4 className="letras">{user.nombres+" "+user.apellidos}</h4>
              <p className="letras">{user.email}</p>
              <p className="letras">{user.tipousuario}</p>
              {/* <p className="profileInfoDesc">Conjunto: {conjunto.nombre}</p> */}
              {
                user.tipousuario ==="Administrador"?
                <p className="letras">Conjunto :{nConjunto}</p>
                :
                <p className="letras">Vivienda: {(vivienda.tipoagrupacion!=='null'? vivienda.tipoagrupacion:'')+" "+(vivienda.numagrupacion!=='null'?vivienda.numagrupacion:'')+" "+
                vivienda.tipoinmueble+" "+vivienda.numinmueble}</p>
              }
          </div>
          <Divider />
          <List className="letras">
            {user.tipousuario==="Administrador"?
              <div>
                <ListItemButton name="Configuracion" className="Configuracion" onClick={handleClick}>
                  <ListItemIcon><SettingsIcon className="sidebarIcon letras"/> </ListItemIcon>
                  <ListItemText className="letras">Configuracion</ListItemText>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding>
                      <ListItemButton name="CrearUsuario" className="crearUsuario" onClick={changeSection('crearUsuario') } sx={{ pl: 4 }}>
                        <ListItemIcon><PersonAddIcon className="sidebarIcon letras"/> </ListItemIcon>
                        <ListItemText className="letras">CrearUsuario</ListItemText>
                      </ListItemButton>
                      <ListItemButton name="Conjuntos" className="Conjuntos" onClick={changeSection('Conjuntos') }sx={{ pl: 4 }}>
                        <ListItemIcon><HomeWorkIcon className="sidebarIcon letras"/> </ListItemIcon>
                        <ListItemText className="letras"> Conjunto</ListItemText>
                      </ListItemButton>
                      <ListItemButton name="ConfigurarConjuntos" className="ConfigurarConjuntos" onClick={changeSection('ConfigurarConjuntos') }sx={{ pl: 4 }}>
                        <ListItemIcon><MapsHomeWorkTwoToneIcon className="sidebarIcon letras"/> </ListItemIcon>
                        <ListItemText className="letras">Añadir Inmuebles</ListItemText>
                      </ListItemButton>
                      <ListItemButton name="EditarUsuario" className="EditarUsuario" onClick={changeSection('EditarUsuario') }sx={{ pl: 4 }}>
                        <ListItemIcon><HomeRoundedIcon className="sidebarIcon letras"/> </ListItemIcon>
                        <ListItemText className="letras">Asignar viviendas</ListItemText>
                      </ListItemButton>
                      <ListItemButton name="ZonasComunes" className="ZonasComunes" onClick={changeSection('ZonasComunes') }sx={{ pl: 4 }}>
                        <ListItemIcon><BeachAccessTwoToneIcon className="sidebarIcon letras"/> </ListItemIcon>
                        <ListItemText className="letras">Zonas Comunes</ListItemText>
                      </ListItemButton>
                    </List>
                </Collapse>
                
              </div>
              :
              <div><ListItemButton name="Alquilar" className="Alquilar" onClick={changeSection('Alquiler') }sx={{ pl: 4 }}>
              <ListItemIcon><BeachAccessTwoToneIcon className="sidebarIcon letras"/> </ListItemIcon>
              <ListItemText className="letras">Alquilar</ListItemText>
            </ListItemButton></div>
            }
            <ListItemButton  name="Feed" className="Feed" onClick={changeSection('Feed') }>
              <ListItemIcon><EmojiEmotionsIcon className="sidebarIcon letras"/> </ListItemIcon>
              <ListItemText className="letras">Feed</ListItemText>
            </ListItemButton>
            <ListItemButton  name="Exit" className="Exit" onClick={changeSection('Exit') }>
              <ListItemIcon><Exit className="sidebarIcon letras"/> </ListItemIcon>
              <ListItemText className="letras">Exit</ListItemText>
            </ListItemButton>
          </List>          
        </ul>
        <hr className="sidebarHr" />
      </div>
    </div>
  );
}