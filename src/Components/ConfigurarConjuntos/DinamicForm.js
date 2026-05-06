import React,{useState,useEffect} from 'react'

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import IconButton from '@mui/material/IconButton';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import PropTypes from 'prop-types';
const defaultState = {
    numero:''
}
function RowInput ({onChange,onRemove,type,numero}){
    return(
        <Box textAlign='center' >
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
            <Typography  align="center" component="p" gutterBottom >{type}</Typography>
            <TextField
                required
                id={"n"+type}
                name={"n"+type}
                label="#"
                variant="outlined"
                value={numero}
                onChange={e=> onChange("numero",e.target.value)}
                style ={{width: '30%'}}
                />
             <Button onClick={onRemove} variant="outlined" color="error">Eliminar</Button>
             </Stack>
        </Box>
    )
}

RowInput.propTypes = {
    onChange: PropTypes.func,
    onRemove: PropTypes.func,
    type: PropTypes.string,
    numero: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
const DinamicForm = ({name,type,toggleNext}) => {
    const [rows, setRows] = useState([defaultState]);

    const handleOnChange = (index, name, value) => {
        const copyRows = [...rows];
        copyRows[index] = {
          ...copyRows[index],
          [name]: value
        };
        setRows(copyRows);
      };
    
    const handleOnAdd = () => {
    setRows(rows.concat(defaultState));
    };

    const handleOnRemove = index => {
        const copyRows = [...rows];
        copyRows.splice(index, 1);
        setRows(copyRows);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // iterar por cada columna y enviar al back
        console.log(data);
        setRows([defaultState]);
        toggleNext()

    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate  textAlign='center' > 
            <div>
            <Typography variant="h4" align="center" component="h1" gutterBottom >{name}</Typography>
                    {rows.map((row, index) => (
                        <RowInput
                        {...row}
                        onChange={(name, value) => handleOnChange(index, name, value)}
                        onRemove={() => handleOnRemove(index)}
                        key={index}
                        name={name}
                        type={type}
                        />
                    ))}
                <IconButton onClick={handleOnAdd} size="large"  color="success">
                    <AddCircleTwoToneIcon fontSize="inherit"/>
                </IconButton>
            </div>
            <Box textAlign='center'>
                <Button type="submit" variant="contained" color="success"endIcon={<SaveTwoToneIcon/>}>Confirmar</Button>
            </Box>
        </Box>
    )
}

export default DinamicForm
