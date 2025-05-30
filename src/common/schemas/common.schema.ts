import { prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import mongoose from 'mongoose';

export class CommonSchema extends TimeStamps {
  @prop({ default: true })
  is_active?: boolean;

  @prop({ default: null })
  created_by?: mongoose.Schema.Types.ObjectId;

  _id?: mongoose.Types.ObjectId;

  @prop({ default: null })
  deleted_at?: Date;
}
