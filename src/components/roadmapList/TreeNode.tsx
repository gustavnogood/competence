import React from "react";
import { MyTreeNodeDatum } from "./RoadmapTree";


interface TreeNodeProps {
    nodeDatum: MyTreeNodeDatum;
    toggleNode: () => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ nodeDatum, toggleNode }) => {
    return (
        <g onClick={() => toggleNode()}>
            <rect width={100} height={50} stroke="black" fill="white" />
            <foreignObject x="0" y="0" width="100" height="50">
                <div style={{ width: '100px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px' }}>
                    {nodeDatum.name}
                    <button onClick={(e) => {
                        e.stopPropagation(); // Prevents the node toggle
                        console.log('you clicked:', nodeDatum.id, nodeDatum.name);
                        // add logic for appending the node id to user in cosmos db
                        
                    }}>
                    ✓
                    </button>
                </div>
            </foreignObject>
        </g>
    );
};

export default TreeNode;