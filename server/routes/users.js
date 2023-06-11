import express from "express";

import { registerUser } from "../controllers/users.js";

const router = express.Router();


//POST
router.post("/register", registerUser)


export default router;