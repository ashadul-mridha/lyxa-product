import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';
import { CommonSchema } from '../../../common/schemas/common.schema';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: { collection: 'products' },
})
export class ProductSchema extends CommonSchema {
  @prop({ required: true, type: String })
  public name!: string;

  @prop({ required: true, type: String })
  public slug!: string;

  @prop({ type: String, default: null })
  public description?: string;

  @prop({ required: true, min: 0, type: Number })
  public price!: number;

  @prop({ required: true, type: Number })
  public qty!: number;

  @prop({ required: true })
  public userId!: mongoose.ObjectId;
}

export const ProductModel = getModelForClass(ProductSchema);
