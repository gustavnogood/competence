import { useMsal } from "@azure/msal-react";
const LogOutButton = () => {
    const { instance } = useMsal();

    const logout = () => {
        instance.logoutRedirect();
    };

    return (
        <button onClick={logout}>
            Log Out
        </button>
    );
};

export default LogOutButton;