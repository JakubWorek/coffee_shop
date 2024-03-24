import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req){
  mongoose.connect(process.env.MONGODB_URL);

  const postData = await req.json();
  const {phone, streetAdress, postalCode, city, country, cartProducts} = postData;
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    phone,
    streetAdress,
    postalCode,
    city,
    country,
    cartProducts,
    paid: false,
  });

  const stripeLineItems = [];
  for (const product of cartProducts){
    const productInfo = await Product.findById(product._id);

    let productPrice = productInfo.basePrice;
    if (product.size){
      const size = productInfo.sizes
        .find(size => size._id.toString() === product.size._id.toString());
      productPrice += size.price;
    }

    const productName = product.name;


    stripeLineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
      quantity: 1,
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: {orderId: orderDoc._id.toString()},
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: {amount: 500, currency: 'usd'},
        },
      }
    ]
  });

  return Response.json(stripeSession.url)
}