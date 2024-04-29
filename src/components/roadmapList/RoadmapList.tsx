import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import RoadmapItem from "./RoadmapItem";
import Loading from "../loading/Loading";
import { Roadmap} from './Types';
import { AxiosError } from "axios";




const RoadmapList: React.FC = () => {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                const response = await axiosInstance.get('/roadmap');
                setRoadmaps(response.data);
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

    return (
        <div>
            {loading ? (
                <Loading />
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                roadmaps.map((roadmap) => <RoadmapItem key={roadmap.id} roadmap={roadmap} />)
            )}
        </div>
    );
};

export default RoadmapList;