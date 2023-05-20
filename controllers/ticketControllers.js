import generateTicket from "../logic/generateTicket.js";
import Ticket from "../models/ticket.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  unAuthenticatedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

// create ticket
const createTicket = async (req, res, next) => {
  const { number } = req.body;
  if (!number) {
    throw new BadRequestError("Please provide a number between 1 to 10");
  }
  console.log(req.user);
  req.body.author = req.user.userId;
  req.body.tickets = generateTicket(number);
  const tickets = await Ticket.create(req.body);
  res.status(StatusCodes.CREATED).json({ tickets });
};

// read tickets
const getTicket = async (req, res, next) => {
  const queryObject = {
    author: req.user.userId,
  };
  let result = Ticket.find(queryObject);
  //setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const tickets = await result;
  const totalTickets = await Ticket.countDocuments(queryObject);
  const allTickets = await Ticket.find({ author: req.user.userId });
  const numOfPages = Math.ceil(totalTickets / limit);

  res.status(StatusCodes.OK).json({ tickets, allTickets, numOfPages });
};

// delete tickets
const deleteTicket = async (req, res, next) => {
  const { id: ticketId } = req.params;
  const ticket = await Ticket.findOne({ _id: ticketId });
  if (!ticket) {
    throw new NotFoundError(`No tickets associated with id ${ticketId}`);
  }
  checkPermissions(req.user, ticket.author);
  await ticket.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Tickets Removed" });
};

export { createTicket, getTicket, deleteTicket };
