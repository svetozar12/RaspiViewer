import { model, Schema, Document, ObjectId } from "mongoose";
import { IUser } from "./User.model";

export interface IDevice extends Document {
  userId: IUser["_id"];
  name: string;
  ip_address: string;
  status: string;
  uuid: string;
}

const deviceSchema = new Schema<IDevice>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: Schema.Types.String },
    ip_address: { type: Schema.Types.String, required: true },
    uuid: { type: Schema.Types.String, required: true },
  },
  { timestamps: true },
);

const Device = model<IDevice>("Device", deviceSchema);
export default Device;
