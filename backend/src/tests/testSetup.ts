/**
 * @summary
 * Global test environment setup
 *
 * @module tests
 */

// Set test environment
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

// Global test utilities can be added here
export const testConfig = {
  timeout: 5000,
  apiUrl: 'http://localhost:3001',
};
