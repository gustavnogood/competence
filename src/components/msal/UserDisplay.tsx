import { ApiDataType } from './Msal';

type UserDisplayProps = {
    apiData: ApiDataType | null;
    addUserToDB: () => void;
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
            <button onClick={addUserToDB}>Add user to DB</button>
        </div>
    );
}