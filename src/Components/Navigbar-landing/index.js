import {useState,useEffect,useMemo} from 'react';
import PropTypes from 'prop-types';
import {FaBars} from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import {animateScroll as scroll } from 'react-scroll';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavBtnWrapper,
    Button
} from './NavigbarElements';

const Navbar = ({toggle}) => {
    const [scrollNav, setScrollNav] = useState(false);
    const changeNav =()=>{
        if(window.scrollY >= 80){
            setScrollNav(true)
        }
        else{
            setScrollNav(false)
        }
    }

    useEffect( () => {
            window.addEventListener('scroll',changeNav)
    },[]);

    const toggleHome =() =>{
        scroll.scrollToTop();
    }
    const providerValue = useMemo(() => ({ color: '#fff' }), []);
    return (
        <IconContext.Provider value={providerValue}>
        {/*create with rafce command'*/}
            <Nav scrollNav={scrollNav}>
                <NavbarContainer >
                    <NavLogo to='/' onClick={toggleHome}>Social Neighborhood</NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>
                    <NavMenu>

                        <NavBtnWrapper>
                            <Button  to='/Login'>Iniciar sesion </Button>
                        </NavBtnWrapper>
                    </NavMenu>

                </NavbarContainer>
            </Nav>
            </IconContext.Provider> 
    )
}

Navbar.propTypes = {
    toggle: PropTypes.func,
};

export default Navbar
