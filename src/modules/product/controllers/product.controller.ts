import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserAuthGuard } from '../../../common/guards/user-auth.guard';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // create product
  @Post()
  @UseGuards(UserAuthGuard)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return createProductDto;
  }
}
