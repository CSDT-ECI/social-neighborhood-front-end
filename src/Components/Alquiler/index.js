import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import DropForm from '../Conjuntos/DropForm';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Swal from "sweetalert2";
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import DialogActions from '@mui/material/DialogActions';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const Alquiler = ({conjunto,user,vivienda,isEnabled,handleClose}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

const handleSubmit = (event) => {
    event.preventDefault();
    handleClose()
    let body={
        idZonaComun:current.idZonaComun,
        idunidaddeviviendausuario:vivienda.idunidaddevivienda,
        iniciodealquiler: parseInt((new Date(value2+' '+current.iniciodealquiler).getTime()/1000).toFixed(0)),
        findealquiler: parseInt((new Date(value2+' '+current.findealquiler.split(' ')[1])/1000).toFixed(0)),
        costo:current.findealquiler.split(' ')[2],
        pagado: true,
        cancelado:false
    }
    console.log(body)
    let url = window.$dir+`client`+`/`+ 'newAlquiler/'+
    body.iniciodealquiler+`/`+
    body.findealquiler+`/`+
    body.idZonaComun+`/`+
    conjunto.idconjunto+`/`+
    user.id+`/`+
    body.idunidaddeviviendausuario+`/`+
    body.costo
    console.log(url);
    axios.post(url)
    .then( function (response) {
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
        Swal.fire(
            'Alquilado! :)',
            'No olvides compartir este evento con tus amigos'
            ).then((result) => {
                if (result.isConfirmed) {
                } });
        } else {
        Swal.fire("Something is Wrong :(!", "try again later", "error");
        }                                                               
    })
    .catch(function (errorx) {
        Swal.fire("No es posible hacer el alquiler! :(!", "intenta con otro horario", "error");
    });
};

const [current,setCurrent] = useState({
    idZonaComun:null,
    idunidaddeviviendausuario:'',
    iniciodealquiler:'',
    findealquiler:'',
    costo:''
});
const handleOnChange = (name, value) => {
    setCurrent({
        ...current,[name]:value
    });
    };

    const toggleInicioAlquiler = data => {
        handleOnChange('iniciodealquiler',data)
    };
    const toggleFinAlquiler = data => {
        handleOnChange('findealquiler',data)
    };
    const toggleZonaComun = (value) => {
        handleOnChange("idZonaComun",value)
        };
    const [value3, setValue3] = useState(new Date());
    const [value2, setValue2] = useState('2021-12-01');
    const handleChange2 = (newValue) => {
        const today = new Date(newValue)
        let currentMonth = parseInt(today.getMonth()+1);
        let currentDay = today.getDate();
        if (currentMonth<10) currentMonth='0'+currentMonth;
        if (currentDay<10) currentDay='0'+currentDay;
        let res  = today.getFullYear()+ "-"+ currentMonth +"-"+currentDay
        console.log(res)
        setValue2(res);
        setValue3(newValue);
        };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog open={isEnabled} onClose={handleClose}  fullWidth
        maxWidth="md">
        <DialogTitle id="responsive-dialog-title"> {"Alquilar"} </DialogTitle>   
        <DialogContent> 
            <DialogContentText>
                Que deseas alquilar? recuerda compartir este evento con tus amigos del conjunto!
            </DialogContentText>
            <Box sx={{  flexGrow: 1 }} >
            <Grid container justifyContent="center" alignItems="flex-start" className="formConjuntos"> 
                <Grid item xs={6}>
                    <Paper >  
                            <img
                                src="/pool.png" 
                                heigh="270px" width="270px"
                            />
                    </Paper>
                </Grid>
                <Grid item xs={6} > 
                    <DropForm param='zonaComun'
                        currentConjunto ={conjunto} currentUsuario={user} 
                        location='admin' enableSubmit={false} submited={toggleZonaComun} isenable={true}/>
                    <Grid container spacing={2}  >
                        <Grid item xs={6}> 
                            <DesktopDatePicker
                               label="DateTimePicker"
                               inputVariant="outlined"
                               value={value3}
                               size="small"
                               onChange={handleChange2}
                              renderInput={(params) => <TextField {...params} />}
                                />
                        </Grid>
                        <Grid item xs={3}> 
                        {current.idZonaComun&&value2?
                        <div>
                        {console.log(value2)}
                         <DropForm param={'HorasInicioAlquiler/'+value2+'/'+current.idZonaComun}
                         currentConjunto ={conjunto} currentUsuario={user} 
                         location='client' enableSubmit={false} 
                         submited={toggleInicioAlquiler} isenable={true}
                         stringStr={true}
                         /></div>:<div></div>
                        }
                        </Grid>
                    </Grid>
                    <br/>
                    {current.iniciodealquiler!=='' && value2?
                         <DropForm param={'HorasFinAlquiler'+'/'+value2+'/'+current.iniciodealquiler+'/'+current.idZonaComun}
                         currentConjunto ={conjunto} currentUsuario={user} 
                         location='client' enableSubmit={false} 
                         submited={toggleFinAlquiler} isenable={true}
                         stringStr={true}
                         />:<div></div>
                        }
                </Grid>
            </Grid>
            <br/>
            <DialogActions>
                <Button autoFocus onClick={handleSubmit}>
                    Aceptar 
                </Button>
                <Button onClick={handleClose} autoFocus>
                    Cancelar
                </Button>
            </DialogActions>
            </Box>
        </DialogContent> 
        </Dialog>
        </LocalizationProvider>
    )
    }    
export default Alquiler
