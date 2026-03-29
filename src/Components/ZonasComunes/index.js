import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import DropForm from '../Conjuntos/DropForm';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';

import Swal from "sweetalert2";

const ZonasComunes = ({conjunto,user,currentVivienda}) => {

const [current,setCurrent] = useState({
    idZonaComun:0
});
const handleOnChange = (value) => {
    console.log(value)
    setCurrent({
        ...current,idZonaComun:value
    });
    console.log(current)
  };
const getStringDataLocation =()=>{
    let str =''
    user?.tipoUsuario === 'Residente' ? 
    str = currentVivienda.idconjunto+`/`+user.id+`/`+currentVivienda.idunidaddevivienda
    : str = conjunto.idconjunto+`/`+conjunto.idusuarioadministrador+`/`+conjunto.id
    return str;
}
const [isAgrupacion,setIsAgrupacion] = useState(false);

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let body={
        idZonaComun:current.idZonaComun,
        idConjunto: conjunto.idconjunto,
        tiempoAlquilerCobro: data.get('tiempoAlquiler'),
        costoAlquiler: data.get('costoAlquiler'),
        Disponible: data.get('row-radio-buttons-group'),
        tiempodeespera: data.get('tiempoEspera'),
        tiempomaximoalquiler: data.get('tiempoMaximo')
    }
    console.log(data);
    console.log(body);
    let currentstr = getStringDataLocation();
    axios.post(`${window.$dir}admin/newzonaComunConjunto/${currentstr}`, body)
    .then( function (response) {
        console.log(response.status + isAgrupacion);
        console.log(response.data);
        if (response.status === 200) {
        Swal.fire(
            'Actualizado correctamente',
            'success'
            ).then((result) => {
                if (result.isConfirmed) {
                } });
        } else {
        Swal.fire("Something is Wrong :(!", "try again later", "error");
        }                                                               
    })
    .catch(function (errorx) {
        Swal.fire("Esta zona comun ya existe! :(!", "intenta con otra  zona de tu conjunto", "error");
    });
};

    
    return (
        <Box sx={{  flexGrow: 1,mx:0 }} className="card">
        <Typography variant="h4" align="center" component="h1" gutterBottom>Zonas Comunes</Typography>
            <Typography align="center" component="p" gutterBottom>
                Siempre divertirse y compartir va ser muy importante para  crear una comunidad mas unida es por eso
                que aqui podrás añadir las zonas comunes con que cuenta tu conjunto con el fin de que estas puedan ser alquiladas
                y usadas por otros usuarios 
                </Typography>
            <Grid container justifyContent="center" alignItems="flex-start" className="formConjuntos"> 
                <Grid item xs={4}>
                    <Paper >  
                            <img
                                alt=''
                                src="/sport1.png" 
                                heigh="270px" width="270px"
                            />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper >  
                            <img
                                alt=''
                                src="/sport2.png" 
                                heigh="270px" width="270px"
                            />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper >  
                            <img
                                alt=''
                                src="/sport3.png" 
                                heigh="270px" width="270px"
                            />
                    </Paper>
                </Grid>
            </Grid>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="card">
            <Grid container spacing={2} justifyContent="center" alignItems="flex-start" >     
                <Grid item xs={4} > 
                    <DropForm param='zonaComun'
                        currentConjunto ={conjunto} currentUsuario={user} 
                        location='admin' enableSubmit={false} submited={handleOnChange} isenable={true}/>
                </Grid>
                <Grid item xs={4}> 
                    <TextField
                        required
                        id="tiempoAlquiler"
                        name="tiempoAlquiler"
                        label="tiempo Alquiler/h"
                        variant="outlined"
                        type="number"
                    />
                </Grid>
                <Grid item xs={4}> 
                    <TextField
                        required
                        id="costoAlquiler"
                        name="costoAlquiler"
                        label="costo de Alquiler"
                        variant="outlined"
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}      
                    />
                </Grid>
            </Grid>
            <FormControl component="fieldset">
                <FormLabel component="legend">Disponible</FormLabel>
                <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                    <FormControlLabel value="true" control={<Radio />} label="verdadero" />
                    <FormControlLabel value="false" control={<Radio />} label="falso" />
                </RadioGroup>
            </FormControl>
            <Grid container spacing={2} justifyContent="center" alignItems="flex-start" >     
                <Grid item xs={6}> 
                    <TextField
                        required
                        id="tiempoEspera"
                        name="tiempoEspera"
                        label="Espera/h"
                        variant="outlined"
                        helperText="tiempo a esperar entre eventos"
                        size="small"
                        type="number"
                    />
                </Grid>
                <Grid item xs={6}> 
                    <TextField
                        required
                        id="tiempoMaximo"
                        name="tiempoMaximo"
                        label="TiempoMaximo/h"
                        variant="outlined"
                        helperText="tiempo maximo de alquiler"
                        size="small"
                        type="number"
                    />
                </Grid>
            </Grid>
            <br/>
            <Box textAlign='center'>
                <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
            </Box>
            </Box>
        </Box>
    )
    }    
export default ZonasComunes
