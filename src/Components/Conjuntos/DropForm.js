import { useState, useEffect, useCallback } from "react";

import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

import Swal from "sweetalert2";
import PropTypes from 'prop-types';

const getElementId = (element) => {
    if (element.id) return element.id;
    if (element.horainicio) return element.horainicio;
    return element.horafin;
};

const getElementLabel = (element) => {
    if (element.nombre) return element.nombre;
    if (element.horainicio) return element.horainicio;
    if (element.horafin) return element.horafin;
    return `${element.nombres} ${element.apellidos}`;
};

const DropForm = ({param,param2,param3,stringStr,
                    location,location2,
                    onChange,enableSubmit,submited,isenable,
                    currentConjunto,currentUsuario,currentVivienda,
                    level}) => {
    const [datas, setDatas] = useState([]);
    const [currentItem, setCurrentItem] = useState(0);
    const [loading, setLoading] = useState(false);
    const [enablesubmit2, setEnablesubmit2] = useState(false);

    const getStringDataLocation = useCallback(() => {
        return currentUsuario?.tipoUsuario === 'Residente'
            ? `${currentVivienda.idconjunto}/${currentUsuario.id}/${currentVivienda.idunidaddevivienda}`
            : `${currentConjunto.idconjunto}/${currentConjunto.idusuarioadministrador}/${currentConjunto.id}`;
    }, [currentUsuario, currentVivienda, currentConjunto]);

    const baseDir = globalThis.$dir || '';

    const buildRequestBody = useCallback(() => {
        if (param2 === "newTipoAgrupacion") {
            return {
                idconjunto: currentConjunto.idconjunto,
                idTipoAgrupacion: currentItem
            };
        }
        if (param2 === "newInmueble") {
            return {
                idconjunto: currentConjunto.idconjunto,
                idTipoInmueble: currentItem
            };
        }
        return {};
    }, [param2, currentItem, currentConjunto.idconjunto]);

    const handleSubmitSuccess = useCallback(() => {
        Swal.fire(
            'Actualizado correctamente',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                setLoading(false);
                submited();
            }
        });
    }, [submited]);

    const handleSubmitError = useCallback((error_) => {
        setLoading(false);
        Swal.fire(
            "Este tipo ya existe en tu conjunto" + String(error_),
            "Intenta con otro tipo",
            "error"
        );
    }, []);

    const Togglesubmit2 = (val = true) => {
        setEnablesubmit2(val);
    };

    const fetchData = useCallback(async () => {
        let currentstr = getStringDataLocation();
        if (stringStr) currentstr = '';
        await axios.get(baseDir + location + `/${param}/${currentstr}`)
            .then((res) => { setDatas(res.data); })
            .catch((error_) => { console.log("Error: :c " + error_); });
    }, [baseDir, param, location, getStringDataLocation, stringStr]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCurrentItem = (val) => {
        setCurrentItem(val);
        if (isenable) submited(val);
    };

    const handleSubmit = (event) => {
        Togglesubmit2();
        event.preventDefault();
        setLoading(true);
        const body = buildRequestBody();
        const currentstr = getStringDataLocation();
        console.log(body);
        axios.post(baseDir + location + `/${param2}/${currentstr}`, body)
            .then((response) => {
                if (response.status === 200) {
                    handleSubmitSuccess();
                } else {
                    Swal.fire("Something is Wrong :(!", "try again later", "error");
                }
            })
            .catch((error_) => {
                handleSubmitError(error_);
            });
    };

    const renderItems = () => {
        if (param === 'unidadesDeViviendaConjuto') {
            return datas.map((element) => (
                <MenuItem
                    id={element.idunidaddevivienda}
                    key={element.idunidaddevivienda}
                    name={`${element.tipoinmueble} ${element.numinmueble} ${element.tipoagrupacion} ${element.numagrupacion}`}
                    value={`${element.tipoinmueble} ${element.numinmueble} ${element.tipoagrupacion} ${element.numagrupacion}`}
                    onClick={() => handleCurrentItem(element.idunidaddevivienda)}
                >
                    {`${element.tipoinmueble} ${element.numinmueble} ${element.tipoagrupacion} ${element.numagrupacion}`}
                </MenuItem>
            ));
        }
        if (!datas[0].fin) {
            return datas.map((element) => (
                <MenuItem
                    id={getElementId(element)}
                    key={getElementId(element)}
                    name={getElementLabel(element)}
                    value={getElementLabel(element)}
                    onClick={() => handleCurrentItem(getElementId(element))}
                >
                    {getElementLabel(element)}
                </MenuItem>
            ));
        }
        return datas.map((element) => {
            console.log(element);
            return (
                <MenuItem
                    id={element.fin}
                    key={element.fin}
                    name={`${element.fin} ${element.costo}`}
                    value={`${element.fin} ${element.costo}`}
                    onClick={() => handleCurrentItem(`${element.fin} ${element.costo}`)}
                >
                    {`${element.fin} Costo: $${element.costo}`}
                </MenuItem>
            );
        });
    };

    const renderSubmitButton = () => {
        if (!enableSubmit) return null;
        if (loading || datas.length === 0) {
            return (
                <Box textAlign='center'>
                    <LoadingButton loading loadingPosition="start" startIcon={<CircularProgress size={14} />} variant="outlined">Loading..</LoadingButton>
                </Box>
            );
        }
        if (enablesubmit2) {
            return (
                <Box textAlign='center'>
                    <Button type="submit" variant="contained" color="success" endIcon={<SendIcon />}>Confirmar</Button>
                </Box>
            );
        }
        return null;
    };

    return (
        <div>
            <div>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                {datas.length !== 0
                    ? <TextField variant="outlined" id="select" name="prueba2" label={param} select required fullWidth
                        onChange={() => Togglesubmit2()}>
                            {renderItems()}
                    </TextField>
                    : <LoadingButton loading loadingPosition="start" variant="outlined">Loading..</LoadingButton>
                }
                {renderSubmitButton()}
            </Box>
            </div>
            <br/>
        </div>
    );
};

DropForm.propTypes = {
    param: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    param2: PropTypes.string,
    param3: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stringStr: PropTypes.string,
    location: PropTypes.string,
    location2: PropTypes.string,
    onChange: PropTypes.func,
    enableSubmit: PropTypes.bool,
    submited: PropTypes.func,
    isenable: PropTypes.bool,
    currentConjunto: PropTypes.object,
    currentUsuario: PropTypes.object,
    currentVivienda: PropTypes.object,
    level: PropTypes.number
};

export default DropForm
