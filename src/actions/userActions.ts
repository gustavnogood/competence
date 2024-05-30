export const setUser = (userData: any) => {
    return {
        type: 'SET_USER',
        payload: userData,
    };
};