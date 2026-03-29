import {
    HeroContainer,
    HeroContent,
    HeroP,
    HeroH1,
    HeroContentWrapper,
    HColumn1,
    HColumn2,
    HeroRow,
    Button,
    HeroBtnWrapper
} from './LoginElements';
import './LoginFormElements.css';
const HomeSection = () => {
    return (
        <HeroContainer id="home">   
            <HeroContent>
                <HeroContentWrapper>
                <HeroRow>
                    <HColumn1>
                        <HeroH1>Comparte,disfruta y conectate</HeroH1>
                        <HeroP> 
                           Nunca fue tan facil compartir en tu conjunto, con tus amigos y los que mas 
                           quieres, empieza ahora!
                        </HeroP>
                        <HeroBtnWrapper>
                            <Button  to='/Register'>Registrarse</Button>
                        </HeroBtnWrapper>
                    </HColumn1>
                    <HColumn2>
                        <img alt='' src="./BackgroundHERO.png" heigh="500px" width="500px">
                        </img>
                    </HColumn2>
                    </HeroRow>
                </HeroContentWrapper>
            </HeroContent>
        </HeroContainer>
    )
}
export default HomeSection;