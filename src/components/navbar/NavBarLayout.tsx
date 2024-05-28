import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { logoImg } from '../../assets/index';
import { NavBar } from './NavBar';
import styles from './Navbar.module.css';

export const NavBarLayout: React.FC = () => {
    const isSmall = useMediaQuery({ query: '(max-width: 600px)' });

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoContainer}>
                    <img src={logoImg} alt="logo" width="54" height="54" />
                    <h5>Competence</h5>
                </div>
                <NavBar isSmall={isSmall} />
            </div>
        </header>
    );
};

export default NavBarLayout;
