import { useState, useEffect } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import styles from "./Msal.module.css";
import { LoginStatus } from "./LoginStatus";
import { UserDisplay } from "./UserDisplay";
import { addUserToDB } from "./userToDB";

export type ApiDataType = {
    displayName: string;
    id: string;
    nodeId: string;
}

const callMsGraph = async (accessToken: string) => {
    try {
        const response = await fetch("https://graph.microsoft.com/v1.0/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    } catch (error) {
        console.error("Error calling Microsoft Graph API:", error);
        throw error;
    }
};

export default function MsalComponent() {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [userData, setUserData] = useState<ApiDataType | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (account) {
                try {
                    const response = await instance.acquireTokenSilent({
                        scopes: ["User.Read"],
                        account: account
                    });
                    const result = await callMsGraph(response.accessToken);
                    setUserData(result);
                    addUserToDB(result, "1"); // Only call this once user data is fetched
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData();
    }, [account, instance]);

    if (accounts.length > 0) {
        return (
            <div className={styles.Container}>
                <LoginStatus inProgress={inProgress} accounts={accounts} />
                <UserDisplay apiData={userData} />
            </div>
        );
    } else if (inProgress === "login") {
        return <span>Login is currently in progress!</span>;
    } else {
        return <span>There are currently no users signed in!</span>;
    }
}
