const express = require('express');
const appRouter = require('api');
const { logRequests, cors } = require('globalMiddlewares');

// Create app
const app = express();

// Use json for api
app.use(express.json());

// Apply middlewares actionable on all routes of the app
app.use(logRequests); // Log every logRequests
app.use(cors); // Allow cors

// Apply global router
app.use(appRouter);

module.exports = { app };
