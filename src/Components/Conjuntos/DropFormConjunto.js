import { useState, useEffect, useCallback } from "react";

import axios from 'axios';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Swal from "sweetalert2";

const defaultState = [];
const DropFormConjunto = ({param,location,onChange,enableSubmit,param2,currentConjunto,submited}) => {
    const [data,setData]= useState([])
    const fetchData = useCallback(async () => {
            await axios.get(window.$dir+location+`/`+ param
            ).then(res =>{  
                const res1 = res.data         
                axios.get(window.$dir+location+`/conjuntoById/`+ res1.idconjunto
                    ).then(res =>{  
                        const res2 = res.data         
                        setData(res2)
                        onChange(res1)
                    }).catch(
                        e =>{console.log("Error: :c "+e)}
                )
            }).catch(
                e =>{console.log("Error: :c "+e)}
            )
        },[param])
    useEffect(()=>{
        fetchData()
    },[fetchData])
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        // enviar datos al back
        let body ={}
        if (param2 === "newTipoAgrupacion")
            body={
                idconjunto:currentConjunto,
                tipoAgrupacionConjunto:data.id}
        body={
            idconjunto:currentConjunto,
            tipoInmuebleConjunto:data.id}
        axios.post(window.$dir+`admin/`+param2, body)
        .then( function (response) {
            console.log(response.status);
            console.log(response.data);
            if (response.status === 200) {
            Swal.fire(
                'Tipo actualizado correctamente',
                'success'
            )
            } else {
            Swal.fire("Something is Wrong :(!", "try again later", "error");
            }
        })
        .catch(function (errorx) {
            Swal.fire(""+errorx, "try again later", "error");
        });
    };
    return (
        <div>
                <div>
                <Box component="form" onSubmit={handleSubmit}  noValidate  > 
                <TextField 
                    disabled fullWidth
                    id = "conjuntoAdmin"
                    variant="outlined" 
                    onChange={fetchData} 
                    value = {data.nombre}
                    >
                </TextField>
                {
                enableSubmit?
                <Box textAlign='center'>
                    <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
                </Box>
                :<div></div>
                }
                </Box>
                </div>
                <br/>
        </div>
        
    )
}

export default DropFormConjunto