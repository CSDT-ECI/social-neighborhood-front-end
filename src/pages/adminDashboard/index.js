import Leftbar from '../../Components/Leftbar';
import Feed from '../../Components/Feed';
import Conjuntos from '../../Components/Conjuntos';
import RegisterUser from  '../../Components/RegisterUser';
import Rightbar from '../../Components/Rightbar';
import {useState,useEffect} from 'react'
import './admin.css';
import ConfigurarConjuntos from '../../Components/ConfigurarConjuntos';
import EditarUsuario from '../../Components/EditarUsuario';
import Swal from "sweetalert2";
import ZonasComunes from '../../Components/ZonasComunes';
import { useHistory } from 'react-router-dom';

const AdminDashboard = () => {
    let history = useHistory();
    const [section, setSection] = useState('Feed');
    const [currentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [currentConjunto] = useState(JSON.parse(localStorage.getItem('conjunto')));
    const [currentVivienda] = useState(JSON.parse(localStorage.getItem('vivienda')));
    const changeSection = some => () =>{
        console.log(section)
        setSection(some)
     }
      const [right] = useState([]);

    const switchSection = (param) =>{
        switch(param) {
            case 'crearUsuario':
              return <RegisterUser user={currentUser} conjunto={currentConjunto}/>;
            case 'Conjuntos':
                return <Conjuntos user={currentUser} conjunto={currentConjunto}/>;
            case 'Feed':
                    return <Feed user={currentUser} conjunto={currentConjunto} />;
            case 'ConfigurarConjuntos':
                return <ConfigurarConjuntos user={currentUser} conjunto={currentConjunto}/>;
            case 'EditarUsuario':
                return <EditarUsuario  user={currentUser} conjunto={currentConjunto}/>;
            case 'ZonasComunes':
                return <ZonasComunes  user={currentUser} conjunto={currentConjunto}/>;
            case 'Exit':
                history.push("/");
                break;
            default:
              return <Feed user={currentUser} conjunto={currentConjunto}/>;
          }
     }
    useEffect(() => {
        const fetchUser = async () => {
        if (!currentUser) {
            await Swal.fire(
                'No está autentificado',
                'Por favor inicie sesion para usar esta funcionalidad',
                'error'
            )
            // eliminar localStorage
            localStorage.clear();
            // redireccionar a login
            window.location.replace("/login")
        }
        //const res = await axios.get(`/users?username=${username}`);
        console.log("current-------User")
        console.log(currentConjunto)
        console.log(currentUser)
        console.log("currentassssssssssssdasdUser")
        console.log(currentVivienda)
        console.log("currentasdasdUser")

        }
        fetchUser();
    },[currentConjunto, currentUser, currentVivienda]);
    return (
        <div className="adminContainer">
            <div className="fondo"/>
            <Leftbar user={currentUser} conjunto={currentConjunto} changeSection={changeSection}/>
            <div className="leftabsoluteadmin">
                {switchSection(section)
                }
            </div>
            <div className="rightabsoluteadmin">
                <Rightbar right={right}/>
            </div>
        </div>
    )
}

export default AdminDashboard;
