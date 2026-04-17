import "./post.css";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Grow from '@mui/material/Grow';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function Post({data}) {

  return (
   <div className="card_post">
       <Grow in={true} style={{timeout: 500}}>
      <Card >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {data?.nombreUsuario[0]+ ' '+ data?.apellidoUsuario[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data?.nombreUsuario+' '+data?.apellidoUsuario}
        subheader={new Intl.DateTimeFormat('en-US', 
                {year: 'numeric', month: '2-digit',day: '2-digit', 
                hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(data?.fechaPublicacion)}
      />
      {data.imagen?
      <CardMedia
        component="img"
        height="194"
        image={data.imagen}
        alt="asado"
      />:<div></div>}
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {data?.texto}
        </Typography>
      </CardContent>
    </Card>
    </Grow>
   </div>
  );
} 