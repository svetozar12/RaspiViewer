import { Schema, model, Document } from "mongoose";
import { IDevice } from "./Device.model";

export interface IUser extends Document {
  email: string;
  verificationCode: number;
  devices: Array<IDevice["_id"]>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    devices: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    verificationCode: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const User = model<IUser>("User", userSchema);

export default User;
