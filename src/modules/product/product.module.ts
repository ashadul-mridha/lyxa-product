import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitmqModule } from '../../config/rabbitmq/rabbitmq.module';
import { ProductController } from './controllers/product.controller';
import { ProductSubController } from './MQ/product.sub';
import { ProductModel } from './schemas/product.schema';
import { ProductService } from './services/product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductModel.schema,
      },
    ]),
    RabbitmqModule,
  ],
  controllers: [ProductController, ProductSubController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
