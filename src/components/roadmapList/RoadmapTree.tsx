import React, { useState, useEffect } from "react";
import { Tree, RawNodeDatum } from 'react-d3-tree';
import Loading from "../loading/Loading";
import { fetchRoadmaps } from "./api";
import TreeNode from "./TreeNode";
import { useResizeHandler } from "./useResizeHandler";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface MyTreeNodeDatum extends RawNodeDatum {
    depth: number;
    name: string;
    id: string;
}

const RoadmapList: React.FC = () => {
    const [data, setData] = useState<RawNodeDatum[] | undefined>();
    const [, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { treeWrapperRef, translate } = useResizeHandler();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchRoadmaps();
                setData(data);
                setError(null); 
                setDataLoaded(true);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleNodeDrop = (item: { id: string }, targetNode: MyTreeNodeDatum) => {
        console.log(`Dropped node ${item.id} on node ${targetNode.id}`);
        // Implement the logic to handle the drop, e.g., updating the state or making an API call.
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="RoadmapTree">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <div ref={treeWrapperRef} id="treeWrapper" style={{ width: '100%', height: '70vh' }}>
                        <Tree
                            data={data}
                            translate={translate}
                            orientation="vertical"
                            pathFunc={'step'}
                            initialDepth={0}
                            transitionDuration={500}
                            rootNodeClassName="node__root"
                            branchNodeClassName="node__branch"
                            leafNodeClassName="node__leaf"
                            renderCustomNodeElement={(rd3tNodeProps) => {
                                const nodeDatum = rd3tNodeProps.nodeDatum as unknown as MyTreeNodeDatum;
                                const toggleNode = rd3tNodeProps.toggleNode;
                                return (
                                    <TreeNode
                                        nodeDatum={nodeDatum}
                                        toggleNode={toggleNode}
                                        onNodeDrop={handleNodeDrop}
                                    />
                                );
                            }}
                        />
                    </div>
                )}
            </div>
        </DndProvider>
    );
};

export default RoadmapList;
