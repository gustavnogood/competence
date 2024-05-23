import { ApiDataType } from './Msal';

type UserDisplayProps = {
    apiData: ApiDataType | null;
    addUserToDB: (apiData: ApiDataType | null, nodeId: string) => void;
};

export function UserDisplay({ apiData, addUserToDB }: UserDisplayProps) {
    return (
        <div>
            {apiData && (
                <p>
                    Display Name: {apiData.displayName} <br/>
                    ID: {apiData.id}
                </p>
            )}
            <button onClick={() => addUserToDB(apiData, "1")}>Add user to DB</button>
        </div>
    );
}