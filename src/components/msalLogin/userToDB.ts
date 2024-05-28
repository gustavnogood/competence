import axiosInstance from '../../axios/axiosInstance';
import { ApiDataType } from './Msal';

export function addUserToDB(apiData: ApiDataType | null, nodeId: string) {
    if (!apiData || !apiData.id || !apiData.displayName) {
        console.error("Invalid user data");
        return;
    }

    const userRequest = {
        id: apiData.id,
        displayName: apiData.displayName,
        nodeId: nodeId
    };

    axiosInstance.post('users', userRequest)
        .then(response => console.log(response))
        .catch(error => console.error("Error adding user to DB:", error));
}
