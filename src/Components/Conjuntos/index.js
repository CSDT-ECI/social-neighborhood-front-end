import React,{useState} from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import './conjuntos.css';
import DropForm from './DropForm';

const Conjuntos = ({user, conjunto}) => {
    const [isAgrupacion,setIsAgrupacion] = useState(false);
    const [isInmueble,setIsInmueble] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // enviar datos al back
        console.log({
            tipoAgrupacion: data.get('tipoAgrupacion'),
            tipoInmueble: data.get('tipoInmueble'),
        });
    };
    const toggleAgrupacion =()=>{
        setIsAgrupacion(true);
        setIsInmueble(false);
        }
    const toggleInmueble =()=>{
        setIsAgrupacion(false);
        setIsInmueble(true);
        }
    const handleNext =()=>{
        toggleInmueble();
        }
    const handleDisabled =()=>{
        setIsAgrupacion(false);
        setIsInmueble(false);
        }
    return (
        <Box sx={{  flexGrow: 1,mx:0 }} className="card">
        <Typography variant="h4" align="center" component="h1" gutterBottom>Conjuntos</Typography>
            <Typography align="center" component="p" gutterBottom>
                A continuación podrás indicar que tipo de conjunto quieres tener, no es necesario 
                 contar con una agrupacion.
                </Typography>
            <Grid container justifyContent="center" alignItems="flex-start" className="formConjuntos"> 
                <Grid item xs={6} >
                    <Box component="form" onSubmit={handleSubmit} noValidate  textAlign='center' > 
                   </Box>
                       <Stack direction="row" spacing={2} alignItems="left" justifyContent="center">
                           <Box textAlign='center'>
                        <Button onClick={toggleAgrupacion} variant="contained" color="info" size="small"
                                >Crear Tipo Agrupacion</Button>
                        </Box>
                        <Box textAlign='center'>
                            <Button onClick={toggleInmueble} size="small" variant="contained" color="info">Crear Tipo Inmueble</Button>
                        </Box>
                       </Stack>
                       <div></div>
                   <br/>
                   <br/>
                    {
                        isAgrupacion? 
                        <DropForm param='TipoAgrupacionesGeneral' param2="newTipoAgrupacion"
                                 location='admin' submited={handleNext}  
                                 enableSubmit={true} currentConjunto ={conjunto} currentUsuario={user} />
                        :
                        isInmueble?
                        <DropForm param='TipoInmueblesGeneral' param2="newInmueble" 
                                location='admin'enableSubmit={true} submited={handleDisabled} currentConjunto ={conjunto} currentUsuario={user} />   
                        :
                        <div></div>
                    }
                </Grid> 
                <Grid item xs={6}>
                <Paper >  
                        <img
                            alt='Conjunto'
                            src="/conjunto.png" 
                            className="image"
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Conjuntos
