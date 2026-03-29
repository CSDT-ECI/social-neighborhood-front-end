import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import DropForm from '../Conjunt

const EditarUsuario = ({user,conjunto}) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(current);
    };

    const handleVivienda = (message) => {
        handleOnChange("idUnidadDeVivienda",message)
    };
    const handleusuario = (message) => {
        handleOnChange("idUsuario",message)
    };
    const [current,setCurrent] = useState({
        idUnidadDeVivienda:'',
        idUsuario:''
    });
    const handleOnChange = (name, value) => {
        setCurrent({
            ...current,[name]:value
        });
      };
    return (
        <div>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 ,mx:0}} className="card_edit" fullWidth>
           <Typography variant="h4" align="center" gutterBottom>Usuarios</Typography>
           <div>
            <DropForm param='Usuario'
             currentConjunto ={conjunto} currentUsuario={user} 
                                location='admin' enableSubmit={false} submited={handleusuario} isenable={true}/>
            </div>               
            <br/>
        <div className="card">
            <Typography variant="h4" align="center" component="h1" gutterBottom >Viviendas</Typography>
            <div>
                <Grid container spacing={2} justifyContent="center" alignItems="flex-start" >  
                    <Grid item xs={5} >                              
                        <TextField
                            required
                            disabled
                            id="tipoHabitante"
                            label="tipo de Habitante"
                            variant="outlined"
                            value="propietario"
                            />   
                        </Grid>
                    <Grid item xs={5} >    
                        <DropForm param='unidadesDeViviendaConjuto' param2="newUnidadDeVivienda"
                                            location='admin' submited={handleVivienda}  isenable={true}
                                            enableSubmit={false} currentConjunto ={conjunto} currentUsuario={user} />
                    </Grid>
                </Grid>  
            </div>
        </div>
        <Box textAlign='center'>
            <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
        </Box>
        </Box>
        </div>
    )
}

export default EditarUsuario
