import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
const LogOutButton = () => {
    const { instance } = useMsal();

    const logout = () => {
        instance.logoutRedirect();
    };

    return (
        <Button onClick={logout}>Sign out</Button>
    );
};

export default LogOutButton;