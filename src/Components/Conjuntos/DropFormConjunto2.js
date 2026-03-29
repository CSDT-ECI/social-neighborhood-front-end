import React, { useState, useEffect, useCallback } from "react";

import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

import Swal from "sweetalert2";

const DropFormConjunto2 = ({param,param2,param3,param4,
                    location,location2,location3,
                    onChange,enableSubmit,submited,submited2,
                    currentConjunto,currentUsuario,currentVivienda,
                    submiting,needNumber,submiting2,
                    level}) => {
    const [datas,setDatas] = useState([]);
    const [datas2,setDatas2] = useState([]);
    const [current,setCurrent] = useState({
        idItem:'',
        nmbreItem:'',
        nItem:''
    });

    const [loading,setIsloading] =useState(false);
    const getStringDataLocation = useCallback(() => {
        return currentUsuario?.tipoUsuario === 'Residente'
            ? `${currentVivienda.idconjunto}/${currentUsuario.id}/${currentVivienda.idunidaddevivienda}`
            : `${currentConjunto.idconjunto}/${currentConjunto.idusuarioadministrador}/${currentConjunto.id}`;
    }, [currentUsuario, currentVivienda, currentConjunto]);
    const ayuda = useCallback((res, currentstr) => {
        axios.all(res?.map(result => {
            let str = result.idTipoAgrupacion
            ? result.idTipoAgrupacion
            : result.idtipoagrupacionconjunto
                ? `${result.idtipoagrupacionconjunto}/${currentstr}`
                : result.idTipoInmueble;

            return axios.get(`${window.$dir}${location2}/${param3}/${str}`)
            .then(response => {
                if (level && level === 2) {
                return axios.get(`${window.$dir}${location3}/${param4}/${response.data.idTipoAgrupacion}`)
                    .then(response => response.data);
                }
                return response.data;
            });
        })).then(lista => {
            setIsloading(false);
            setDatas2(lista);
        });
    }, [location2, param3, location3, param4, level]);
    const fetchData = useCallback(async () => {
        setIsloading(true)
        let currentstr = getStringDataLocation();
        await axios.get(window.$dir+location+`/`+ param+`/`+ currentstr
        )
        .then( (res) =>{ 
            if(level>=1){
                console.log(res.data)
                ayuda(res.data,currentstr)
            }
            setDatas(res.data)

        }).catch(
            e =>{console.log("Error: :c "+e)}
        )
    },[param, ayuda, getStringDataLocation, level, location])

    
useEffect(()=>{
    fetchData()
},[fetchData])

useEffect(()=>{
    submited(current)
},[current, submited])

const handleOnChange = (name, value) => {
    setCurrent({
        ...current,[name]:value
    });
  };
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsloading(true)
        let body ={}
        if (param2 === "newAgrupacion")
            body={
                idtipoagrupacionconjunto:current.idItem,
                numero:current.nItem}
        axios.post(`${window.$dir}${location}/${param2}`, body)
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
            setIsloading(false)
            Swal.fire("Esta agrupacion ya existe! :(!", "intenta con otro numero o tipo", "error");        });
    };
    return (
        <div>
                <div>
                <Box component="form" onSubmit={handleSubmit} noValidate> 
                <Grid container spacing={2} justifyContent="center" alignItems="flex-start" >   
                    <Grid item xs={8} > 
                        {datas2?.length!==0?
                            <TextField variant="outlined" id="select" label={param} select required fullWidth
                                 >
                                    { 
                                    datas2?.map((e,index)=>{
                                            return(
                                            <MenuItem id={datas[index].id? datas[index].id:e?.id} 
                                            key ={datas[index].id? datas[index].id:e?.id}
                                            name={datas[index].numero? e?.nombre +" "+ datas[index].numero:e?.nombre } 
                                            value={datas[index].numero? e?.nombre +" "+ datas[index].numero:e?.nombre } 
                                            onClick={event=>{handleOnChange("idItem",datas[index].id? datas[index].id:e?.id)
                                                            }}
                                            >
                                            {datas[index].numero? e?.nombre +" "+ datas[index].numero:e?.nombre } 
                                            </MenuItem>  )
                                    })  
                                }
                        </TextField>
                         :<LoadingButton loading  variant="outlined"></LoadingButton>
                        }
                    </Grid>
                    {
                    (!needNumber)?
                    <Grid item xs={4}> 
                        <TextField
                            required
                            id="nItem"
                            name="nItem"
                            label="#"
                            variant="outlined"
                            onChange={e=> handleOnChange("nItem",e.target.value)}
                        />
                    </Grid>:<div></div>
                    }
                </Grid>
                {
                    enableSubmit?
                    <Box textAlign='center'>
                        {
                            (current.idItem!=='' && current.nItem!=='' && !loading) ?
                            <Button type="submit" variant="contained" color="success"endIcon={<SendIcon />}>Confirmar</Button>
                            :<div></div>
                        }{
                            loading?
                            <LoadingButton loading loadingPosition="start" startIcon={<CircularProgress size={14} />} variant="outlined">Loading..</LoadingButton>
                            :<div></div>
                        }
                    </Box>
                    :<div></div>
                }
                </Box>
                </div>
                <br/>
        </div>
        
    )
}

export default DropFormConjunto2
