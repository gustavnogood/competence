import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MyTreeNodeDatum } from "./RoadmapTree";

interface DragItem {
    id: string;
    type: string;
}

interface TreeNodeProps {
    nodeDatum: MyTreeNodeDatum;
    toggleNode: () => void;
    onNodeDrop: (item: DragItem, node: MyTreeNodeDatum) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ nodeDatum, toggleNode, onNodeDrop }) => {
    const ref = useRef<SVGGElement>(null);

    // Define the drop behavior
    const [, drop] = useDrop({
        accept: "NODE",
        drop: (item: DragItem) => {
            onNodeDrop(item, nodeDatum);
        }
    });

    // Define the drag behavior
    const [{ isDragging }, drag] = useDrag({
        type: "NODE",
        item: { id: nodeDatum.id, type: "NODE" },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    });

    // Connect drag and drop refs to the DOM element
    drag(drop(ref));

    return (
        <g ref={ref} onClick={() => toggleNode()} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
            <rect width={100} height={50} stroke="black" fill="white" />
            <foreignObject x="0" y="0" width={100} height={50}>
                <div style={{ width: '100px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px' }}>
                    {nodeDatum.name}
                    <button onClick={(e) => {
                        e.stopPropagation();
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
