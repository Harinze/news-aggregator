// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const app = express();

// // CORS configuration
// app.use(cors({
//   origin: '*', // Be cautious with this in production
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Helper function for API requests
// async function makeApiRequest(url) {
//   try {
//     const response = await axios.get(url);
//     return {
//       status: 200,
//       success: true,
//       message: "Successfully fetched the data",
//       data: response.data,
//     };
//   } catch (error) {
//     console.error("API request error:", error.response ? error.response.data : error);
//     return {
//       status: 500,
//       success: false,
//       message: "Failed to fetch data from the API",
//       error: error.response ? error.response.data : error.message,
//     };
//   }
// }

// app.get("/all-news", async (req, res) => {
//   let pageSize = parseInt(req.query.pageSize) || 80;
//   let page = parseInt(req.query.page) || 1;
//   let q = req.query.q || 'world'; // Default search query if none provided

//   let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
//   const result = await makeApiRequest(url);
//   res.status(result.status).json(result);
// });

// app.get("/top-headlines", async (req, res) => {
//   let pageSize = parseInt(req.query.pageSize) || 80;
//   let page = parseInt(req.query.page) || 1;
//   let category = req.query.category || "general";

//   let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
//   const result = await makeApiRequest(url);
//   res.status(result.status).json(result);
// });

// app.get("/country/:iso", async (req, res) => {
//   let pageSize = parseInt(req.query.pageSize) || 80;
//   let page = parseInt(req.query.page) || 1;
//   const country = req.params.iso;

//   let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=${pageSize}`;
//   const result = await makeApiRequest(url);
//   res.status(result.status).json(result);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, function () {
//   console.log(`Server is running at port ${PORT}`);
// });



import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";

dotenv.config();
const app = express();

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend's origin
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helper function for API requests
async function makeApiRequest(url) {
  try {
    const response = await axios.get(url);
    return {
      status: 200,
      success: true,
      message: "Successfully fetched the data",
      data: response.data,
    };
  } catch (error) {
    console.error("API request error:", error.response ? error.response.data : error);
    return {
      status: 500,
      success: false,
      message: "Failed to fetch data from the API",
      error: error.response ? error.response.data : error.message,
    };
  }
}

// Routes

app.get("/", (req, res) => {
  res.send("Welcome to the News API Server. Use endpoints like /all-news, /top-headlines, or /country/:iso.");
});


app.get("/all-news", async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 80;
  const page = parseInt(req.query.page) || 1;
  const q = req.query.q || "world"; // Default search query

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

app.get("/top-headlines", async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 80;
  const page = parseInt(req.query.page) || 1;
  const category = req.query.category || "general";

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

app.get("/country/:iso", async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 80;
  const page = parseInt(req.query.page) || 1;
  const country = req.params.iso;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=${pageSize}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
