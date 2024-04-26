import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import RoadmapItem from "./RoadmapItem";
import Loading from "../loading/Loading";
import { Roadmap} from './Types';




const RoadmapList: React.FC = () => {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                const response = await axiosInstance.get('/roadmap');
                setRoadmaps(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch roadmaps:', error);
            }
        };

        fetchRoadmaps();
    }, []);

    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                roadmaps.map((roadmap) => <RoadmapItem key={roadmap.id} roadmap={roadmap} />)
            )}
        </div>
    );
};

export default RoadmapList;