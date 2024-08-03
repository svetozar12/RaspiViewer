import { model, Schema, Document } from "mongoose";
import { IUser } from "./User.model";

export interface IDevice extends Document {
  userId: IUser["_id"];
  name: string;
  ip_address: string;
  status: string;
}

const deviceSchema = new Schema<IDevice>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: Schema.Types.String },
    ip_address: { type: Schema.Types.String, required: true },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
      required: true,
    },
  },
  { timestamps: true },
);

const Device = model<IDevice>("Device", deviceSchema);
export default Device;
