import { useMediaQuery } from 'react-responsive';
import { logoImg } from '../../assets/index';
import { NavBar } from './NavBar';

export type MainLayoutProps = Record<string, never>;

export const NavBarLayout = () => {
    const isSmall = useMediaQuery({ query: '(max-width: 600px)' });

    return (
        <header className="header" style={{ position: "relative", backgroundColor: "#D7D2CB"}}>
        <div>
            <div style={{ flexGrow: 1 }}>
            <div className="logo-container"style={{ display: "flex", alignItems: "center", gap: '0.5rem', cursor: 'pointer' }}>
                <img width="54px" height="54px" src={logoImg} alt="logo" />
                <h5 style={{ width: 'fit-content' }}>Competence</h5>
            </div>
            </div>
            
            <NavBar isSmall={isSmall} />
        </div>
        </header>
    );
};

export default NavBarLayout;