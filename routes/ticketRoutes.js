import express from "express";

import {
  createTicket,
  getTicket,
  deleteTicket,
} from "../controllers/ticketControllers.js";

const router = express.Router();

router.route("/").post(createTicket).get(getTicket);
router.route("/:id").delete(deleteTicket);

export default router;
