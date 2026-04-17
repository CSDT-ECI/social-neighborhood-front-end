import React from 'react'

import {    
    FooterContainer,
    FooterWrap,
    SocialMedia,
    SocialMediaWrap,
    WebSiteRight,
    SocialLogo,
    NavLinks

} from './FooterElements';
const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <SocialMedia>
                    <SocialMediaWrap>


                        <SocialLogo to='/'>Social Neighborhood</SocialLogo>
                        <NavLinks
                            to="about"
                            smooth={true}
                            duration={500}
                            spy={true}
                            exact ='true'
                            offset={20}
                        >Quienes Somos?</NavLinks>
                        <NavLinks
                            to="ls"
                            smooth={true}
                            duration={500}
                            spy={true}
                            exact ='true'
                            offset={20}
                            >Contáctanos</NavLinks>

                    </SocialMediaWrap>
                    <SocialMediaWrap>
                        <WebSiteRight>Ana Maria Salazar Bohorquez,
                                                 Juan Camilo Posso Guevara, Richard Santiago Urrea Garcia © {new Date().getFullYear()} All rights  reserved</WebSiteRight>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer