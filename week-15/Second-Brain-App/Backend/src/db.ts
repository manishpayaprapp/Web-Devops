import mongoose, { Schema, model } from "mongoose";
import { DB_URL } from "./config";

export type ContentType = "youtube" | "twitter";

interface User {
  username: string;
  password: string;
}

interface Content {
  title: string;
  link: string;
  type: ContentType;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

interface SharedLink {
  hash: string;
  userId: mongoose.Types.ObjectId;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true, trim: true, maxlength: 32 },
  password: { type: String, required: true },
}, { timestamps: true });

const contentSchema = new Schema<Content>({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  link: { type: String, required: true, trim: true },
  type: { type: String, enum: ["youtube", "twitter"], required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
}, { timestamps: true });

const sharedLinkSchema = new Schema<SharedLink>({
  hash: { type: String, required: true, unique: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
}, { timestamps: true });

export const UserModel = model<User>("User", userSchema);
export const ContentModel = model<Content>("Content", contentSchema);
export const LinkModel = model<SharedLink>("Links", sharedLinkSchema);

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(DB_URL);
}
