import { Product } from "@/models/Product";
import mongoose from 'mongoose';

export async function POST(req){
  mongoose.connect(process.env.MONGODB_URL);
  const data = await req.json();
  const productDoc = await Product.create(data);

  return Response.json(productDoc);
}

export async function GET(req){
  mongoose.connect(process.env.MONGODB_URL);
  const products = await Product.find();

  return Response.json(products);
}

export async function PUT(req){
  mongoose.connect(process.env.MONGODB_URL);
  const {_id, ...data} = await req.json();
  await Product.findByIdAndUpdate(_id, data);
  return Response.json(true);
}

export async function DELETE(req){
  mongoose.connect(process.env.MONGODB_URL);
  const {_id} = await req.json();
  await Product.deleteOne({_id});
  return Response.json(true);
}