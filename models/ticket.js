import mongoose, { Schema } from "mongoose";

const TicketSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, "Please select a Number between 1 to 10"],
    min: 1,
    max: 10,
  },
  tickets: {
    type: Schema.Types.Mixed,
    required: [true, "Must include ticket"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Ticket", TicketSchema);
