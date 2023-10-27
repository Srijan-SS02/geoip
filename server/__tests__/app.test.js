// __tests__/app.test.js

const request = require('supertest');
const express = require('express');
const app = require('../app'); // Replace '../app' with the correct path to your Express app file

describe('Express App', () => {
  it('should serve index.html on /home route', async () => {
    const response = await request(app).get('/home');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toContain('text/html');
  });

  it('should return city information for a valid IP', async () => {
    const validIP = '128.101.101.101'; // Replace with a valid IP from your database
    const response = await request(app).get(`/city/${validIP}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('city'); // Adjust the property name as per your data structure
  });

  it('should handle invalid IP addresses', async () => {
    const invalidIP = '0.0';
    const response = await request(app).get(`/city/${invalidIP}`);
    expect(response.status).toBe(500); // Adjust this based on how you handle errors
  });
});
