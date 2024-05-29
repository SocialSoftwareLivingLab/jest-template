// userService.ts
import { fetchUserData } from './api';

export const getUserFullName = async (userId: string) => {
    const userData = await fetchUserData(userId);
    return `${userData.firstName} ${userData.lastName}`;
};
