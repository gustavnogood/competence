import { useState, useEffect } from "react"
import { useMsal, useAccount } from "@azure/msal-react";
import styles from "./Msal.module.css";
import axiosInstance from '../../axios/axiosInstance';


type ApiDataType = {
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

    function addUserToDB() {
        if (apiData && apiData.id && apiData.displayName) {
            const userRequest = {
                id: apiData.id,
                displayName: apiData.displayName
                
            };
            console.log(userRequest);
    
            axiosInstance.post('users', userRequest)
                .then(response => console.log(response))
                .catch(error => console.error('Error adding user to DB:', error.response.data));
        } else {
            console.error('invalid apiData:', apiData);
        }
    }

    useEffect(() => {
        if (account) {
            instance.acquireTokenSilent({
                scopes: ["User.Read"],
                account: account
            }).then((response) => {
                if(response) {
                    callMsGraph(response.accessToken).then((result: any) => setApiData(result));
                }
            });
        }
    }, [account, instance]);


    if (accounts.length > 0) {
        return (
            <div className={styles.Container}>
                There are currently {accounts.length} users signed in!
                {apiData && (  
                <p>
                    Display Name: {apiData.displayName} <br/>
                    ID: {apiData.id}

                </p>)}
                <button onClick={addUserToDB}>Add user to DB</button>
            </div>
        );
    } else if (inProgress === "login") {
        return <span>Login is currently in progress!</span>
    } else {
        return <span>There are currently no users signed in!</span>
    }
}
