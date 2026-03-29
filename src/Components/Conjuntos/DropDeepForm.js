import React, { useState, useEffect, useCallback } from "react";

import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Swal from "sweetalert2";

const defaultState = {
    id:'',
    conjunto:'',
    tipoAgrupacion:'',
    numeroAgrupacion:'',
    tipoInmueble:'',
    numeroInmueble:'',
    costoAdministracion:''
};
const defaultState0 = [];

const DropDeepForm = ({param,location,onChange,enableSubmit,param2,currentConjunto,submited}) => {
    const [datas,setDatas]= useState([])

    const fetchData = useCallback(async () => {
            // get unidades de vivienda by Email
            await axios.get(window.$dir+location+`/`+ param
            ).then(res =>{  
                const dataRes = res.data       
                //por cada unidad de vivienda hacer
                setDatas(dataRes)
                    console.log(datas)  
                    console.log(dataRes)
            }).catch(
                e =>{console.log("Error: No se encuentran unidades de vivienda para el Usuario "+e)}
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
        if (param2 = "newTipoAgrupacion")
            body={
                idconjunto:currentConjunto,
                tipoAgrupacionConjunto:data.id}
        body={
            idconjunto:currentConjunto,
            tipoInmuebleConjunto:data.id}
        axios.post(`https://socialneighborhood.herokuapp.com/admin/`+param2, body)
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
                <Box component="form" onSubmit={handleSubmit} noValidate  > 
                <TextField variant="outlined" id="select" label={param} select required fullWidth
                    onChange={fetchData} >
                        {datas?.map((uVivienda)=>{
                            return (
                                <MenuItem id={uVivienda.idunidaddevivienda}
                                        key ={uVivienda.idunidaddevivienda}
                                        name={uVivienda.idunidaddevivienda} 
                                        value={uVivienda.nombreconjunto+": "+(uVivienda.tipoagrupacion!=='null'? uVivienda.tipoagrupacion:'')+" "+(uVivienda.numagrupacion!='null'?uVivienda.numagrupacion:'')+" "+
                                        uVivienda.tipoinmueble+" "+uVivienda.numinmueble
                                                }
                                        onClick= {(e)=> onChange(uVivienda)}
                                        >
                                    {uVivienda.nombreconjunto+": "+(uVivienda.tipoagrupacion!=='null'? uVivienda.tipoagrupacion:'')+" "+(uVivienda.numagrupacion!=='null'?uVivienda.numagrupacion:'')+" "+
                                                uVivienda.tipoinmueble+" "+uVivienda.numinmueble}
                                </MenuItem>        
                            )                 
                        })
                        }
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

export default DropDeepForm
