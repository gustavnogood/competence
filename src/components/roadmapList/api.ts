import axiosInstance from "../../axios/axiosInstance";

export const fetchRoadmaps = async () => {
    const response = await axiosInstance.get('/roadmap');
    const rootNode = {
        name: 'Start Here',
        id: '0',
        children: response.data,
    };
    return [rootNode];
}