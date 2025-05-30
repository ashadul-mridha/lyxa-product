import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../../../common/decorators/user.decorator';
import { MongoIdParams } from '../../../common/dtos/query.dto';
import { UserRequest } from '../../../common/dtos/user-req.dto';
import { throwError } from '../../../common/errors/errors.function';
import { UserAuthGuard } from '../../../common/guards/user-auth.guard';
import { CreateProductDto } from '../dtos/create-product.dto';
import { QueryProductDto } from '../dtos/query-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductService } from '../services/product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // create product
  @Post()
  @UseGuards(UserAuthGuard)
  async createProduct(
    @GetUser() userRequest: UserRequest,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      const product = await this.productService.createProduct(
        userRequest,
        createProductDto,
      );
      return { success: true, product };
    } catch (error) {
      throwError(error.status, error.errors, error.message);
    }
  }

  // get all products
  @Get()
  @UseGuards(UserAuthGuard)
  async findAll(@Query() query: QueryProductDto) {
    try {
      return this.productService.findAll(
        query.perPage && +query.perPage,
        query.currentPage && query.currentPage - 1,
        query.search,
      );
    } catch (error) {
      throwError(error.status, error.errors, error.message);
    }
  }

  // get product by id
  @Get(':id')
  @UseGuards(UserAuthGuard)
  async getProductById(@Param() { id }: MongoIdParams) {
    try {
      const product = await this.productService.findOne(id);
      return { success: true, product };
    } catch (error) {
      throwError(error.status, error.errors, error.message);
    }
  }

  // update product by id
  @Patch(':id')
  @UseGuards(UserAuthGuard)
  async updateProductById(
    @GetUser() userRequest: UserRequest,
    @Param() { id }: MongoIdParams,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await this.productService.updateProductById(
        userRequest,
        id,
        updateProductDto,
      );
      return { success: true, product };
    } catch (error) {
      throwError(error.status, error.errors, error.message);
    }
  }

  // delete product by id
  @Delete(':id')
  @UseGuards(UserAuthGuard)
  async deleteProductById(
    @GetUser() userRequest: UserRequest,
    @Param() { id }: MongoIdParams,
  ) {
    try {
      const product = await this.productService.deleteProductById(
        userRequest,
        id,
      );
      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      throwError(error.status, error.errors, error.message);
    }
  }
}
