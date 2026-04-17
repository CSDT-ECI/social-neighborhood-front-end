import {useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import DropFormConjunto2 from '../Conjuntos/DropFormConjunto2';
import DropFormConjunto3 from '../Conjuntos/DropFormConjunto3';

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
                    {
                        isAgrupacion? 
                            //tendria una lista de ids ahora hacer match de esas ids  con su nombre
                            //por cada dato en tipo de agrupaciones propias hacer: 
                            // axios.get tipo agrupacionbyId y si resulta meterlo a un menuList y sale
                            //añadir input del numero y se sube con un post a newAgrupacion
                            //al otro lado hace get agrupacion y hace match con el nombre respectivo
                            //por ello se va crear un nuevo tipo de form llamado dropMetaForm.js
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
                                enableSubmit={true}   // <- duplicada
                                param2='newAgrupacion'
                                submited={toggleUnidads}
                            />
                            </div>
                        :
                        isUnidad?
                        <div>
                            <DropFormConjunto3 param='TipoAgrupacionesPropia2' 
                                    location='admin' enableSubmit={false} 
                                    currentConjunto ={conjunto} currentUsuario={user} 
                                    location2='social' param3='tipoAgrupacionById2' 
                                    param2='newAgrupacion2' 
                                    />
                        </div>
                            :
                        <div></div>
                    }
                </Grid> 
            </Grid>
        </Box>
    )
}

export default ConfigurarConjuntos
