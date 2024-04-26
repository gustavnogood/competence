import React, { useState } from "react";
import "../../App.css";
import LogOutButton from "../LogOutButton";


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
      <LogOutButton />
      {/* Replace Hidden with a custom component or CSS */}
      <div style={{ display: isSmall ? 'none' : 'flex', gap: '8px' }}>
        {mappedItems}
      </div>
      {/* Replace Hidden with a custom component or CSS */}
      <div style={{ display: isSmall ? 'block' : 'none' }}>
        <button onClick={onOpenHandler}>
          Menu {/* Replace Menu icon with a text or a custom icon */}
        </button>
        {open && (
          <div>
            {/* Replace AppBar, Toolbar, and Typography with native HTML elements */}
            <div style={{ backgroundColor: "#D7D2CB", color: 'text.primary' }}>
              <div>
                <h5 style={{ flexGrow: 1 }}>
                  Menu
                </h5>
                <button onClick={onCloseHandler}>
                  Close {/* Replace Close icon with a text or a custom icon */}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

}