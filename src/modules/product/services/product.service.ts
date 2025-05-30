import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseService } from '../../../common/services/mongoose-service';
import { ProductSchema } from '../schemas/product.schema';

@Injectable()
export class ProductService extends MongooseService<ProductSchema> {
  constructor(
    @InjectModel('Product')
    private productModel: Model<ProductSchema>,
  ) {
    super(productModel);
  }
}
