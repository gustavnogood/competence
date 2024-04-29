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
                setLoading(false);
            } catch (error) {
                const axiosError = error as AxiosError;
                console.error('Failed to fetch roadmaps:', axiosError);
                if (axiosError.response) {
                    console.error('Response data:', axiosError.response.data);
                    console.error('Response status:', axiosError.response.status);
                    console.error('Response headers:', axiosError.response.headers);
                    setError(axiosError.message);
                } else {
                    setError('An unexpected error occurred');
                }
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