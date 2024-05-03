import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import Loading from "../loading/Loading";
import { AxiosError } from "axios";
import Tree, { RawNodeDatum } from 'react-d3-tree';
import './custom-tree.css';




const RoadmapList: React.FC = () => {
    const [data, setData] = useState<RawNodeDatum[] | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                const response = await axiosInstance.get('/roadmap');
                setData(response.data);
                setError(null); // Clear any previous errors
            } catch (error) {
                const axiosError = error as AxiosError;
                console.error('Failed to fetch roadmaps:', axiosError);
                if (axiosError.response) {
                    if (axiosError.response.data) {
                        if (typeof axiosError.response.data === 'object') {
                            // @ts-ignore
                            setError(JSON.stringify(axiosError.response.data));
                        } else {
                            // @ts-ignore
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
    console.log(data);
    return (
        <div className="RoadmapList">
            {loading ? (
                <Loading />
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
                    <Tree
                        data={data}
                        rootNodeClassName="node__root"
                        branchNodeClassName="node__branch"
                        leafNodeClassName="node__leaf"
                    />
                </div>
            )}
        </div>
    );
};

export default RoadmapList;