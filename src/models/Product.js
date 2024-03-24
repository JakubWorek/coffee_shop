import mongoose, {model, models, Schema} from 'mongoose';

const ExtraPriceSchema = new Schema({
  name: String,
  price:Number,
});

const ProductSchema = new Schema({
  image: {type: String},
  name: {type: String},
  description: {type: String},
  category: {type: mongoose.Types.ObjectId},
  basePrice: {type: Number},
  sizes: {type: [ExtraPriceSchema]},
}, {timestamps: true});

export const Product = models?.Product || model('Product', ProductSchema);