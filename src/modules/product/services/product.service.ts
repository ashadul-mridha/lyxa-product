import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserRequest } from '../../../common/dtos/user-req.dto';
import { sluggify } from '../../../common/helpers/helpers.function';
import { MongooseService } from '../../../common/services/mongoose-service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ProductSchema } from '../schemas/product.schema';

@Injectable()
export class ProductService extends MongooseService<ProductSchema> {
  constructor(
    @InjectModel('Product')
    private productModel: Model<ProductSchema>,
  ) {
    super(productModel);
  }

  // create product
  async createProduct(
    userRequest: UserRequest,
    createProductDto: CreateProductDto,
  ) {
    // create product slug
    createProductDto.slug = sluggify(createProductDto.name);

    // create product
    const product = this.createOne({
      ...createProductDto,
      userId: userRequest._id,
    });

    return product;
  }

  async findAll(perPage: number, currentPage: number, search?: string) {
    if (search) {
      return await this.searchByAnyCharacter(
        {
          name: search,
        },
        { currentPage, perPage },
      );
    }

    return await this.findByPaginate({}, { currentPage, perPage });
  }

  // find  by id
  async findOne(id: mongoose.Types.ObjectId) {
    const data = await this.findOneById(id);
    if (!data) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return data;
  }

  // update product by id
  async updateProductById(
    userRequest: UserRequest,
    id: mongoose.Types.ObjectId,
    updateProductDto: UpdateProductDto,
  ) {
    // find product by id
    const product = await this.findOneByQuery({
      _id: id,
      userId: userRequest._id,
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // update product
    return await this.updateById(id, {
      ...updateProductDto,
    });
  }

  // delete product by id
  async deleteProductById(
    userRequest: UserRequest,
    id: mongoose.Types.ObjectId,
  ) {
    // find product by id
    const product = await this.findOneByQuery({
      _id: id,
      userId: userRequest._id,
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // delete product
    return await this.removeById(id);
  }
}
