import { useState, useEffect } from "react"
import { useMsal, useAccount } from "@azure/msal-react";

export default function MsalComponent() {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [apiData, setApiData] = useState(null);

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
            <>
                <span>There are currently {accounts.length} users signed in!</span>
                {apiData && (<span>Data retreived from API: {JSON.stringify(apiData)}</span>)}
            </>
        );
    } else if (inProgress === "login") {
        return <span>Login is currently in progress!</span>
    } else {
        return <span>There are currently no users signed in!</span>
    }
}
