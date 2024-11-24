import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
 
const { Pool } = pg;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// db connection
const pool = new Pool({
    connectionString: process.env.SUPABASE_DB_CONNECTION, //single connection string for added security
});

app.get("/projects", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM projects");
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/experience", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM experience ORDER BY datestart DESC");
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
