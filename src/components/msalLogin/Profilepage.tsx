import { useEffect } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setUser } from '../../actions/userActions';
import styles from "./Msal.module.css";
import { LoginStatus } from "./LoginStatus";
import { UserDisplay } from "./UserDisplay";
import { addUserToDB } from "./userToDB";
import { RootState } from '../../store';

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
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state: RootState) => state.user.userData);

    useEffect(() => {
        const fetchUserData = async () => {
            if (account) {
                try {
                    const response = await instance.acquireTokenSilent({
                        scopes: ["User.Read"],
                        account: account
                    });
                    const result = await callMsGraph(response.accessToken);
                    console.log("Fetched user data:", result);

                    const nodeId = "some-node-id"; // Replace with actual logic to get nodeId
                    dispatch(setUser({ ...result, nodeId }));
                    addUserToDB({ ...result, nodeId }, "1");
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData();
    }, [account, instance, dispatch]);

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
