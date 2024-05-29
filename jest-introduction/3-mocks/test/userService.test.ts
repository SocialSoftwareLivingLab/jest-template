import { getUserFullName } from '../src/userService';
import * as api from '../src/api';

jest.mock('../src/api', () => ({
    fetchUserData: jest.fn(() => Promise.resolve({ firstName: 'John', lastName: 'Doe' }))
}));

describe('getUserFullName', () => {
    it('returns the full name of the user', async () => {
        const fullName = await getUserFullName('123');
        expect(fullName).toBe('John Doe');
    });
});
