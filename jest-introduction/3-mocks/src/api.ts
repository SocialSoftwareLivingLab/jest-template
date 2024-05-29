// api.ts
export const fetchUserData = async (userId: string) : Promise<{firstName: string, lastName: string}> => {
    // This function would normally fetch data from an external API
    throw new Error('fetchUserData must be mocked in tests');
};
