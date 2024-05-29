import { enableFeature, disableFeature, isFeatureEnabled } from '../src/configHandler';

// This will run before each test
beforeEach(() => {
    enableFeature();
});

// This will run after each test
afterEach(() => {
    disableFeature();
});

describe('Feature Tests', () => {
    test('should behave correctly when feature is enabled', () => {
        // The feature should be enabled
        expect(isFeatureEnabled()).toBe(true);
    });

    test('should behave differently when feature is disabled', () => {
        // Manually disable for this test
        disableFeature();
        expect(isFeatureEnabled()).toBe(false);
    });
});