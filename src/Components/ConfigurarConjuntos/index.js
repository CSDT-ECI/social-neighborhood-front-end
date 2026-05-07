import {useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import DropFormConjunto2 from '../Conjuntos/DropFormConjunto2';
import DropFormConjunto3 from '../Conjuntos/DropFormConjunto3';
import PropTypes from 'prop-types';

const ConfigurarConjuntos = ({user,conjunto}) => {
    
    const [isAgrupacion,setIsAgrupacion] = useState(false);
    const [isUnidad,setIsUnidad] = useState(false);
    const toggleAgrupacion =()=>{
        setIsAgrupacion(true);
        setIsUnidad(false);
        }
        
    const toggleUnidad =(event)=>{
        console.log(event)
        setIsAgrupacion(false);
        setIsUnidad(true);
        }
    const toggleUnidads =()=>{}

    const renderFormSection = () => {
        if (isAgrupacion) {
            return (
                <div>
                <br/>
                <DropFormConjunto2
                    param='TipoAgrupacionesPropia'
                    location='admin'
                    currentConjunto={conjunto}
                    currentUsuario={user}
                    location2='social'
                    param3='tipoAgrupacionById'
                    level={1}
                    enableSubmit={true}
                    param2='newAgrupacion'
                    submited={toggleUnidads}
                />
                </div>
            );
        }
        if (isUnidad) {
            return (
                <div>
                    <DropFormConjunto3 param='TipoAgrupacionesPropia2'
                            location='admin' enableSubmit={false}
                            currentConjunto={conjunto} currentUsuario={user}
                            location2='social' param3='tipoAgrupacionById2'
                            param2='newAgrupacion2'
                            />
                </div>
            );
        }
        return <div></div>;
    };

    return (
        <Box sx={{  flexGrow: 1,mx:0}} className="card">
        <Typography variant="h4" align="center" component="h1" gutterBottom>Configuracion de Conjuntos</Typography>
            <Typography align="center" component="p" gutterBottom>
                Un conjunto necesita viviendas!, es por eso que aquí puedes agregar las residencias
                necesarias para los inquilinos
                </Typography>
            <Grid container justifyContent="center" alignItems="flex-start" className="formConjuntos"> 
                <Grid item xs={6}>
                    <Paper >  
                            <img
                                alt="Conjunto"
                                src="/customConjunto.png" 
                                className="image"
                            />
                    </Paper>
                </Grid>
                <Grid item xs={6} >
                   <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                       <Stack direction="row" spacing={2} alignItems="left" justifyContent="center">
                           <Box textAlign='center'>
                        <Button onClick={toggleAgrupacion} variant="contained" color="info" size="small"
                                >Crear Agrupacion</Button>
                        </Box>
                        <Box textAlign='center'>
                            <Button onClick={toggleUnidad} size="small" variant="contained" color="info">Crear Inmueble</Button>
                        </Box>
                       </Stack>:
                       <div></div>
                    </Stack>
                    {renderFormSection()}
                </Grid> 
            </Grid>
        </Box>
    )
}

ConfigurarConjuntos.propTypes = {
    user: PropTypes.object,
    conjunto: PropTypes.object
};

export default ConfigurarConjuntos;
