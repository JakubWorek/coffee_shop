import { Category } from "@/models/Category";
import mongoose from "mongoose";

export async function POST(req){
  mongoose.connect(process.env.MONGODB_URL);
  const {name} = await req.json();
  const categoryDoc = await Category.create({name});

  return Response.json(categoryDoc);
}

export async function PUT(req){
  mongoose.connect(process.env.MONGODB_URL);
  const {_id, name} = await req.json();
  await Category.updateOne({_id}, {name});

  return Response.json(true);
}

export async function GET(){
  mongoose.connect(process.env.MONGODB_URL);
  return Response.json(
    await Category.find()
  );
}

export async function DELETE(req){
  mongoose.connect(process.env.MONGODB_URL);
  const {_id} = await req.json();
  await Category.deleteOne({_id});

  return Response.json(true);
}