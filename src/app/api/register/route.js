import { User } from "@/models/User.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URL);
  const body = await req.json();
  const pass = body.password; 

  if ( !pass?.length || pass.length < 5 ) {
      throw new Error('Password must be at least 5 characters long');
  }

  const notHashedPass = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPass, salt);
  const createdUser = await User.create(body);
  return Response.json(createdUser);
}