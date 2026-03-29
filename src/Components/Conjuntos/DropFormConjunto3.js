import { useState} from "react";
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DropFormConjunto2 from '../Conjuntos/DropFormConjunto2';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Swal from "sweetalert2";
import InputAdornment from '@mui/material/InputAdornment';

const DropFormConjunto3 = ({param,param2,param3,
                    location,location2,
                    onChange,enableSubmit,submited,
                    currentConjunto,currentUsuario,currentVivienda,
                    level}) => {
    const [current,setCurrent] = useState({
        idagrupacion:'',
        idTipoInmuebleConjunto:'',
        numInmueble:'',
        costoAdministracion:''
    });

    const [loading,setIsloading] =useState(false);

const toggleAgrupacion =(message)=>{
    const ans = message.idItem;
    console.log("datos agrupacion")
    console.log(ans);
    if(ans)handleOnChange("idagrupacion",ans)
    
}
const toggleInmueble =(message)=>{
    console.log("datos inmueble "+message.idItem)
    console.log(message);
    handleOnChange("idTipoInmuebleConjunto",message.idItem)
    if(message.nItem) handleOnChange("numInmueble",message.nItem)
}

const toggleVivienda =(message)=>{
    console.log("datos vivienda" + loading)
    console.log(message.currentTarget.value);
    handleOnChange("costoAdministracion",message.currentTarget.value)
}
const handleOnChange = (name, value) => {
    setCurrent({
        ...current,[name]:value
    });
  };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(current)
        setIsloading(true)
        let body ={}
        if (param2 === "newUnidadDeVivienda")
            body={
                idAgrupacion:current.idagrupacion,
                idTipoInmuebleConjunto:current.idTipoInmuebleConjunto,
                numInmueble:current.numInmueble,
                costoAdministracion:current.costoAdministracion
            }
        console.log(body)
        axios.post(window.$dir+location+`/`+ param2, body)
        .then( function (response) {
            console.log(response.status);
            console.log(response.data);
            if (response.status === 200) {
            Swal.fire(
                'Actualizado correctamente',
                'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        setIsloading(false)
                    } });
            } else {
            Swal.fire("Something is Wrong :(!", "try again later", "error");
            }                                                               
        })
        .catch(function (errorx) {
            Swal.fire("Esta vivienda ya existe! :(!", "intenta con otros datos", "error");
        });
    };
    return (
        <div>
                <div>
                <br/>
                <br/>
                <Box component="form" onSubmit={handleSubmit} noValidate> 
                    <DropFormConjunto2  location='admin' param='Agrupacion' 
                                        location2='admin' param3='tipoAgrupacionConjuntoById' 
                                        location3='social' param4='tipoAgrupacionById'
                                        currentConjunto ={currentConjunto} currentUsuario={currentUsuario} 
                                        enableSubmit = {false} level={2} submited={toggleAgrupacion} needNumber={true}
                                        />
                    <br/>
                    <DropFormConjunto2 param='TipoInmueblesPropia' 
                        location='admin' enableSubmit={false} 
                        currentConjunto ={currentConjunto} currentUsuario={currentUsuario} 
                        location2='social' param3='tipoInmuebleById' level={1} 
                        enableSubmit = {false} param2='newAgrupacion' 
                        submited={toggleInmueble} 
                        />
                        <TextField 
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}                        
                        id = "costoAdministracion"
                        name = "costoAdministracion"
                        variant="outlined" 
                        onChange={toggleVivienda} 
                        type="number"
                            >
                    </TextField>
                    <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
                </Box>
                </div>
                <br/>
        </div>
        
    )
}

export default DropFormConjunto3
