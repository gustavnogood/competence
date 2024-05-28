type LoginStatusProps = {
    inProgress: string;
    accounts: any[];
};

export function LoginStatus({ inProgress, accounts }: LoginStatusProps) {
    if (accounts.length > 0) {
        return <span>There are currently {accounts.length} users signed in!</span>;
    } else if (inProgress === "login") {
        return <span>Login is currently in progress!</span>;
    } else {
        return <span>There are currently no users signed in!</span>;
    }
}
