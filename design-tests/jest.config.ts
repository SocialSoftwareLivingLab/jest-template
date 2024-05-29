import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { isolatedModules: true }], // Compilação mais rapida, porem não faz todas as checagens do TS.
  },
};

export default config;
