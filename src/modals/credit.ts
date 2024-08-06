// models/Credit.ts
import { Schema, model, models } from "mongoose";

const CreditSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    default: 20,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Credit = models?.Credit || model("Credit", CreditSchema);

export default Credit;