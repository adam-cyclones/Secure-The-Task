import express from "express";

const router = express.Router();

// Define your routes
router.get('/api', (req, res) => {
    // Your API logic here
    res.json({ version: 1 });
});

// Add more routes as needed

export default router;