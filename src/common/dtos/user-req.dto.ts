import { IsEmail, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class UserRequest {
  @IsNotEmpty()
  @IsMongoId()
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
