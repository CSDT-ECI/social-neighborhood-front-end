import React from 'react'
import RegisterUser from "../../Components/RegisterUser"
import Grid from '@mui/material/Grid';
import Navigbar from '../../Components/Navigbar-landing';
import Footer from '../../Components/Footer';
import "./register.css";
const Register = () => {
    return (
        <div className="fondo">
            <Navigbar/>
            <div className="register_box" >

                <Grid container spacing={30}>

                    <Grid item xs={8}>
                        <img alt='' src="./register.png" heigh="480px" width="480px">
                            </img>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="some">
                            <RegisterUser />
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </div>
    )
}

export default Register
