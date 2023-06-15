import express from "express";

import { registerUser, getUsers } from "../controllers/users.js";

const router = express.Router();

//POST
router.post("/", registerUser);

//GET
router.get("/", getUsers);

export default router;
