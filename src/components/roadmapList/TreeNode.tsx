import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MyTreeNodeDatum } from "./RoadmapTree";

interface DragItem {
    id: string;
}

interface TreeNodeProps {
    nodeDatum: MyTreeNodeDatum;
    toggleNode: () => void;
    onNodeDrop: (item: DragItem, node: MyTreeNodeDatum) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ nodeDatum, toggleNode, onNodeDrop }) => {
    const ref = useRef<SVGGElement>(null);

    const [, drop] = useDrop({
        accept: "NODE",
        drop: (item: DragItem) => onNodeDrop(item, nodeDatum),
    });

    const [{ isDragging }, drag] = useDrag({
        type: "NODE",
        item: { id: nodeDatum.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <g ref={ref} onClick={() => toggleNode()} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <rect width={100} height={50} stroke="black" fill="white" />
            <foreignObject x="0" y="0" width="100" height="50">
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
