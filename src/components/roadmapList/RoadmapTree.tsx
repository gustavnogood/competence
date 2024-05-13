import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import Loading from "../loading/Loading";
import { AxiosError } from "axios";
import { Tree, RawNodeDatum } from 'react-d3-tree';
import './custom-tree.css';


const RoadmapList: React.FC = () => {
    const [data, setData] = useState<RawNodeDatum[] | undefined>();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const treeWrapperRef = useRef(null);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    const handleResize = () => {
        if (treeWrapperRef.current) {
            const { clientWidth, clientHeight } = treeWrapperRef.current;
            setTranslate({ x: clientWidth / 2, y: clientHeight / 2 });
        }
    }

    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/roadmap');
                const rootNode = {
                    name: 'Start Here',
                    id: '0',
                    children: response.data,
                };
                setData([rootNode]);
                console.log('Data after API call:', response.data);
                setError(null); 
                setDataLoaded(true);
            } catch (error) {
                const axiosError = error as AxiosError;
                console.error('Failed to fetch roadmaps:', axiosError);
                if (axiosError.response) {
                    if (axiosError.response.data) {
                        if (typeof axiosError.response.data === 'object') {
                            
                            setError(JSON.stringify(axiosError.response.data));
                        } else {
                            //@ts-expect-error response.data is a string
                            setError(axiosError.response.data);
                        }
                    } else {
                        setError('No data received from server');
                    }
                } else {
                    setError(axiosError.message || 'An unexpected error occurred');
                }
                
            } finally {
                setLoading(false); // Ensure loading is set to false even if an error occurs
            }
        };
    
        fetchRoadmaps();
    }, []);

    useLayoutEffect(() => {
        if (dataLoaded) {    
            handleResize();
            window.addEventListener('resize', handleResize);
    
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [dataLoaded]);

    return (
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
                            const { nodeDatum, toggleNode} = rd3tNodeProps;
                            return (
                                <g onClick={() => toggleNode()}>
                                    <rect width={100} height={50} stroke="black" fill="white" />
                                    <foreignObject x="0" y="0" width="100" height="50">
                                        <div style={{ width: '100px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {nodeDatum.name}
                                        </div>
                                    </foreignObject>
                                </g>
                            );
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default RoadmapList;