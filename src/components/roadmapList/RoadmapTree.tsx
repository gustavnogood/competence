import React, { useState, useEffect } from "react";
import { Tree, RawNodeDatum } from 'react-d3-tree';
import Loading from "../loading/Loading";
import { fetchRoadmaps } from "./api";
import TreeNode from "./TreeNode";
import { useCenteredTree } from "./treeHelpers";
import { RoadmapListProps, MyTreeNodeDatum } from "./Types";

const RoadmapList: React.FC<RoadmapListProps> = ({ userData }) => {
    const [data, setData] = useState<RawNodeDatum[] | undefined>();
    const [, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [translate, treeWrapperRef] = useCenteredTree();

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

    return (
        <div className="RoadmapTree">
            {loading ? (
                <Loading />
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div ref={treeWrapperRef} id="treeWrapper" style={{ width: '100%', height: '100%' }}>
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
                                    userData={userData} // Pass userData to TreeNode
                                />
                            );
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default RoadmapList;
