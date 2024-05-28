import axiosInstance from '../../axios/axiosInstance';
import { ApiDataType } from './Msal';

export function addUserToDB(apiData: ApiDataType | null, nodeId: string) {
    let userRequest;
    if (apiData && apiData.id && apiData.displayName) {
        userRequest = {
            id: apiData.id,
            displayName: apiData.displayName,
            nodeId: nodeId
        };
    }

    if (userRequest) {
        console.log(userRequest);

        axiosInstance.post('users', userRequest)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }
}