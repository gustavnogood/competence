import React from 'react';
import { useMsal } from "@azure/msal-react";
import styles from './Navbar.module.css';

const LogOutButton: React.FC = () => {
    const { instance } = useMsal();

    const logout = () => {
        instance.logoutRedirect();
    };

    return (
        <button onClick={logout} className={styles.logoutButton}>
            Log Out
        </button>
    );
};

export default LogOutButton;
