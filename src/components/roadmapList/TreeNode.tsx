import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';
import { MyTreeNodeDatum } from "./Types";
import { useMsal, useAccount } from "@azure/msal-react";
import { callMsGraph } from "../../utils/callMsGraph"; // Adjust path as needed

interface TreeNodeProps {
    nodeDatum: MyTreeNodeDatum;
    toggleNode: () => void;
    userData?: {
        displayName: string;
        id: string;
        nodeId?: string;
    } | null;
}

const TreeNode: React.FC<TreeNodeProps> = ({ nodeDatum, toggleNode, userData }) => {
    const ref = useRef<SVGGElement>(null);
    const { instance, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [userDataState, setUserDataState] = useState<{ displayName: string; id: string } | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (account) {
                try {
                    const response = await instance.acquireTokenSilent({
                        scopes: ["User.Read"],
                        account: account
                    });
                    const result = await callMsGraph(response.accessToken);
                    setUserDataState(result);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData();
    }, [account, instance]);

    const addNodeToUser = async (nodeId: string) => {
        const currentUserData = userData || userDataState;
        if (!currentUserData) {
            console.error('User data is not available');
            return;
        }

        try {
            const response = await axios.post('/api/users', {
                Id: currentUserData.id,
                DisplayName: currentUserData.displayName,
                RoadmapId: nodeId
            });
            console.log('User updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <g ref={ref} onClick={() => toggleNode()} style={{ cursor: 'pointer' }}>
            <rect width={100} height={50} stroke="black" fill="white" />
            <foreignObject x="0" y="0" width={100} height={50}>
                <div style={{ width: '100px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px' }}>
                    {nodeDatum.name}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('you clicked:', nodeDatum.id, nodeDatum.name);
                            addNodeToUser(nodeDatum.id); // Call the function to add node ID to the user
                        }}
                    >
                        ✓
                    </button>
                </div>
            </foreignObject>
        </g>
    );
};

export default TreeNode;