// routes.js

const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Get all customers with pagination, sorting, and search
router.get("/customers", controller.getAllCustomers);

module.exports = router;
