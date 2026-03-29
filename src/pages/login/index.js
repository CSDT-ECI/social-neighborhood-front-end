import {useState} from 'react'
import { useHistory } from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Swal from 'sweetalert2';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DropDeepForm from '../../Components/Conjuntos/DropDeepForm';
import DropFormConjunto from '../../Components/Conjuntos/DropFormConjunto';
import axios from 'axios';
import './login.css';
const Login=()=>{

    const paperStyle={padding :20,height:'70vh',width:310, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    let history = useHistory();
    const[currentConjuntoData,setCurrentConjuntoData] =useState({})
    const[currentViviendaData,setCurrentViviendaData] =useState({})

    const handleChange = (value) => {
        setCurrentConjuntoData(value)
        console.log(currentConjuntoData);
    };
    const handleChange2 = (value) => {
        setCurrentViviendaData(value)
        console.log(currentViviendaData);
    };

    const [showPassword] = useState(false);

    const[currentUserData,setCurrentUserData] =useState([])

    const sendCache =(rol)=>{
        const body={}
        let url=''
        if(rol ==="Administrador")
        url = window.$dir+`admin/autorizadoAdmin/`+currentConjuntoData.idconjunto+`/`+currentConjuntoData.idusuarioadministrador+`/`+currentConjuntoData.id
        else url =window.$dir+`client/autorizadoClient/`+currentViviendaData.idconjunto+`/`+currentUserData.id+`/`+currentViviendaData.idunidaddevivienda
        axios.post(url, body).then( function (response) {
            console.log(response.status);
            console.log(response.data);
            console.log(response);
            if (response.status === 200) {
            Swal.fire(
                'Youre logged',
                'success'
            )
            } else {
            Swal.fire("Dont send cache data :(!", "try again later", "error");
            //history.push("/login");
            }
        })
        .catch(function (errorx) {
            Swal.fire(""+errorx, "try again later", "error");
            //history.push("/login");
        });
    }
    const handleUser = (e) =>{
        const { value } = e.target;
        //hacer solicitud al back del usuario actual
        if (/\S+@\S+\.\S+/.test(value)) {
            axios.get(window.$dir+`social/userByEmail/` + value
            ).then(res =>{
                    const dat = res.data
                    setCurrentUserData(dat)
                    console.log(currentUserData.email)
                    console.log(currentUserData)
            }).catch(
                e =>{console.log("Error: :c "+e)}
            )
        }
    }
    const  handleSubmit = (e) => {        
        console.log(currentUserData)
        e.preventDefault();
        let redirect =''
        localStorage.setItem('user', JSON.stringify(currentUserData));
        currentUserData.tipousuario==="Administrador"?
        localStorage.setItem('conjunto', JSON.stringify(currentConjuntoData)):
        localStorage.setItem('vivienda', JSON.stringify(currentViviendaData))
        sendCache(currentUserData.tipousuario);
        console.log(currentUserData)
        if (currentUserData.tipousuario && currentUserData.nombres && currentUserData.password) {
            if (currentUserData.tipousuario === 'Administrador') {
                redirect='/adminDashboard/'
            } else {
              redirect='/residentDashboard/'
            }
            history.push(redirect);
        }
    };

    return(
        <Grid>
            <form onSubmit={handleSubmit} className="" >
                <Paper elevation={10} style={paperStyle} class="fondologin">
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Iniciar Sesion</h2>
                    </Grid>
                    <div className="text login">
                        <div>
                            <TextField variant="outlined" id="user" name="user" label="Username" type="email"
                                value={currentUserData?.email}
                                onChange={handleUser} fullWidth autoFocus required />
                        </div>
                        <br></br>
                        <div >
                            <FormControl className="" variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput fullWidth label="Password"
                                    id="outlined-adornment-password-login"
                                    type={showPassword? 'text' : 'password'}
                                    name="password"
                                    autoComplete="off"
                                    // onChange={handleChange}
                                />
                            </FormControl>

                        </div >
                        <br></br>
                        <br></br>
                        {currentUserData?.tipousuario==="Administrador"?
                            <DropFormConjunto param={'conjuntosByEmail/'+currentUserData?.email} location='social' enableSubmit={false} onChange={handleChange}/>
                            :
                        <div>
                            {currentUserData?.tipousuario==='Residente' ?
                            <DropDeepForm param={'unidadesDeViviendaByEmail/'+currentUserData?.email} location='social' enableSubmit={false}  onChange={handleChange2}/>
                            :
                            <div></div>
                            }
                        </div>
                        }
                        <br></br>
                    </div>
                    <Button class="botonlogin" type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                </Paper>
            </form>
        </Grid>
    )
}

export default Login