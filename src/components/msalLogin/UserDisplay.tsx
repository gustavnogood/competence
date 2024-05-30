
import { ApiDataType } from '../roadmapList/Types';
import { addUserToDB } from './userToDB';

type UserDisplayProps = {
    apiData: ApiDataType | null;
};

export function UserDisplay({ apiData }: UserDisplayProps) {
    return (
        <div>
            {apiData ? (
                <p>
                    Display Name: {apiData.displayName} <br />
                    ID: {apiData.id}
                </p>
            ) : (
                <p>No user data available</p>
            )}
            <button onClick={() => addUserToDB(apiData, "1")}>Add user to DB</button>
        </div>
    );
}
