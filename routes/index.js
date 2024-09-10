import express from "express";
import { handleResponse } from "../controller/demo-controller.js";

const router = express.Router();

router.route("/demo").get(handleResponse);

export default router;
