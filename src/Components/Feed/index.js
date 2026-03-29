import { useEffect, useState } from "react";
import Post from "../Post";
import "./feed.css";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import ImageIcon from '@mui/icons-material/Image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {db,storage} from './../../firebase/firebaseConfig';
import {useDate} from '../../useDate'
import Swal from "sweetalert2";
import LoadingButton from '@mui/lab/LoadingButton';

const Feed = ({user,conjunto}) => {
    const [rtData, setRTData] =  useState([])
    const [loading, isLoading] =  useState(false)

    async function  loadDataRT(){
        const suscriber = await db.collection('Post').orderBy("fechaPublicacion", "desc").onSnapshot(querySnapshot =>{
            const posts = []
            querySnapshot.forEach(documentSnapshot => {
                posts.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
            });
            setRTData(posts);
        })
        return () => suscriber()
    }

    useEffect(()=>{
        loadDataRT()
    },[])

    const { date, time } = useDate();
    const [fileUrl,setFileUrl] = useState(null)
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.inputPost.value)
        if( !user.nombres){
            return
        }
        db.collection("Post").doc().set({
            apellidoUsuario: user.apellidos,
            rol: user.tipousuario,
            fechaPublicacion:  Date.now(),
            idConjunto: conjunto?.idconjunto?conjunto.idconjunto:conjunto.idconjuntousuario,
            imagen: fileUrl,
            nombreUsuario: user.nombres,
            texto: e.target.inputPost.value
        }).catch(function (errorx) {
            Swal.fire("Error de servidor :(!", "Intenta de nuevo", "error");
        });
        setFileUrl(null)
        e.target.reset()
      }
    const onFileChange = async(e) =>{
        isLoading(true);
        const file  = e.target.files[0]
        const storageRef = storage.ref()
        const fileRef  = storageRef.child(file.name)
        await fileRef.put(file)
        setFileUrl(await  fileRef.getDownloadURL())
        isLoading(false);
    }
    return (
    <div className="feed">
        <div className="feedWrapper">
        <Card sx={{ width: 700, pl:1}}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[123] }} aria-label="recipe">
                    {user?.nombres[0]+ ' '+ user?.apellidos[0]}
                </Avatar>
                }
                title={user?.nombres+ ' '+ user?.apellidos}
            />
            <div className="date">{date}{time}</div>
            <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <CardContent>
            <TextField
                        required fullWidth
                        id="inputPost"
                        name="inputPost"
                        label="What do you think?"
                        variant="outlined"
                    />
            </CardContent>
            <CardActions disableSpacing>
                <Button variant="contained"component="label" color="info"endIcon={<ImageIcon />}>
                        Upload image
                        <input onChange={onFileChange} type="file" name="file" hidden/>
                </Button>
                {
                    (!loading)?
                    <Button type="submit" variant="contained" color="info" sx={{ ml: 50}}>Publish</Button>
                    : <LoadingButton loading  variant="outlined"></LoadingButton>
                }
             </CardActions>
             </Box>
        </Card>
        {rtData?.map(function (post) {
            console.log(post)
            if(user.tipousuario === 'Residente' && post.rol !== "Administrador")
                return <Post key={post.id} data={post} />
            if(user.tipousuario === 'Administrador' && post.rol !== "Administrador")
                return <Post key={post.id} data={post} />
            return null; // <- asegura que siempre se devuelve algo
        })}
        </div>
    </div>
    )
}

export default Feed
