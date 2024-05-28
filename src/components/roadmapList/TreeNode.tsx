import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import axios from 'axios';
import { MyTreeNodeDatum, DragItem } from "./Types";



interface TreeNodeProps {
    nodeDatum: MyTreeNodeDatum;
    toggleNode: () => void;
    onNodeDrop: (item: DragItem, node: MyTreeNodeDatum) => void;
    userData?: {
        displayName: string;
        id: string;
    } | null;
}

const TreeNode: React.FC<TreeNodeProps> = ({ nodeDatum, toggleNode, onNodeDrop, userData }) => {
    const ref = useRef<SVGGElement>(null);

    const [, drop] = useDrop({
        accept: "NODE",
        drop: (item: DragItem) => {
            onNodeDrop(item, nodeDatum);
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: "NODE",
        item: { id: nodeDatum.id, type: "NODE" },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    drag(drop(ref));

    // Function to add the node ID to the user in Cosmos DB
    const addNodeToUser = async (nodeId: string) => {
        if (!userData) {
            console.error('User data is not available');
            return;
        }

        try {
            const response = await axios.post('/users', {
                id: userData.id,
                displayName: userData.displayName,
                roadmapId: nodeId
            });
            console.log('User updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <g ref={ref} onClick={() => toggleNode()} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
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
