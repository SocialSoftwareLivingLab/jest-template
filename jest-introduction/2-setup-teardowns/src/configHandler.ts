// configHandler.ts
let config = {
    featureEnabled: false,
};

const enableFeature = () => {
    config.featureEnabled = true;
};

const disableFeature = () => {
    config.featureEnabled = false;
};

const isFeatureEnabled = () => {
    return config.featureEnabled;
};

export { enableFeature, disableFeature, isFeatureEnabled };