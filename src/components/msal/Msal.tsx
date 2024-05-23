import { useState, useEffect } from "react"
import { useMsal, useAccount } from "@azure/msal-react";
import styles from "./Msal.module.css";
import { LoginStatus } from "./LoginStatus";
import { UserDisplay } from "./UserDisplay";
import { addUserToDB } from "./userToDB";


export type ApiDataType = {
    displayName: string;
    id: string;
}

export default function MsalComponent() {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [apiData, setApiData] = useState<ApiDataType | null>(null);

    function callMsGraph(accessToken: string) {
        return fetch("https://graph.microsoft.com/v1.0/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
            
        })
        .then(response => response.json())
        .catch(error => {
            console.error("Error calling Microsoft Graph API:", error);
            throw error;
        });
    }

    addUserToDB(apiData, "1");

    useEffect(() => {
        if (account) {
            instance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: account
            }).then((response) => {
                if(response) {
                    callMsGraph(response.accessToken).then((result: ApiDataType) => setApiData(result));
                }
            });
        }
    }, [account, instance]);


    if (accounts.length > 0) {
        return (
            <div className={styles.Container}>
            <LoginStatus inProgress={inProgress} accounts={accounts} />
            <UserDisplay apiData={apiData} addUserToDB={addUserToDB} />
        </div>
        );
    } else if (inProgress === "login") {
        return <span>Login is currently in progress!</span>
    } else {
        return <span>There are currently no users signed in!</span>
    }
}
