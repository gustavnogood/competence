import React, { useState } from "react";
import LogOutButton from "./LogOutButton";
import styles from './NavBar.module.css';

export type NavigationProps = {
  isSmall: boolean;
};

const navigationItems = [
  {
    text: 'Roadmap',
    href: 'roadmap',
  },
  {
    text: 'Profile',
    href: 'profile', 
  },
  {
    text: 'Dashboard',
    href: 'dashboard',
  },
  {
    text: 'Home',
    href: '/',
  }
];

export const NavBar: React.FC<NavigationProps> = ({ isSmall }) => {
  const [open, setOpen] = useState(false);

  const onOpenHandler = () => setOpen(true);
  const onCloseHandler = () => setOpen(false);

  const mappedItems = navigationItems.map(({ text, href }) => (
    <a key={href} href={href} onClick={onCloseHandler} className={styles.navItem}>
      <button className={styles.navButton}>
        {text}
      </button>
    </a>
  ));

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.buttons} style={{ display: isSmall ? 'none' : 'flex' }}>
          {mappedItems}
          <LogOutButton />
        </div>
        <div className={styles.smallMenu} style={{ display: isSmall ? 'block' : 'none' }}>
          <button onClick={onOpenHandler} className={styles.menuButton}>
            Menu 
          </button>
          {open && (
            <div className={styles.menuContent}>
              <div className={styles.menuBackground}>
                <div className={styles.buttons}>
                  {mappedItems}
                  <LogOutButton />
                </div>
                <button onClick={onCloseHandler} className={styles.closeButton}>
                  Close 
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
