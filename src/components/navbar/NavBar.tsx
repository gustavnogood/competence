import React, { useState } from "react";
import "../../App.css";
import LogOutButton from "./LogOutButton";


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

  const mappedItems = (
    navigationItems.map(({ text, href }) => { 
      return (
<a key={href} href={href} onClick={onCloseHandler} style={{ display: 'block', width: isSmall ? '100%' : 'auto' }}>
  <button>
    {text}
  </button>
</a>
      );
    })
  );

  return (
    <>
      
      {/* Replace Hidden with a custom component or CSS */}
      <div className="buttons" style={{ display: isSmall ? 'none' : 'flex', gap: '8px', width: '100%' }}>
        {mappedItems}
        <LogOutButton />
      </div>
      
      <div className="smallMenu" style={{ display: isSmall ? 'block' : 'none' }}>
        <button onClick={onOpenHandler}>
          Menu 
        </button>
        {open && (
          <div>
            
            <div style={{ backgroundColor: "#D7D2CB", color: 'text.primary' }}>
              <div>
              <div className="buttons" style={{ display:'flex', gap: '8px', width: '100%' }}>
        {mappedItems}
        <LogOutButton />
      </div>
                <button onClick={onCloseHandler}>
                  Close 
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

}