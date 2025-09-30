import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput, UpdateProductInput } from './dto/product.dto';
import { ProductResponse } from './dto/product.response';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
    // const products = await this.productsRepository.find();
    // console.log('----- ', products);
    // if (products.length === 0) {
    //   return {
    //     status: 404,
    //     message: 'Product not found',
    //     data: [] as any,
    //   };
    // } else {
    //   return {
    //     status: 200,
    //     message: 'Product found successfully',
    //     data: products as any,
    //   };
    //   // throw new NotFoundException(`Products not found`);
    // }
  }

  async findOneById(id: number): Promise<ProductResponse | null> {
    const product = await this.productsRepository.findOne({ where: { id } });
    return {
      status: product?.id ? 200 : 404,
      message: product?.id ? 'Product found successfully' : 'Product not found',
      data: product?.id ? product : null as any,
    };
    // return {
    //   status: product?.id ? 200 : 404,
    //   message: product?.id ? 'Product found successfully' : 'Product not found',
    //   data: product?.id ? product : null as any,
    // };
    // if (product && product.id) {
    //   return {
    //     status: 200,
    //     message: 'Product found successfully',
    //     data: product,
    //   };
    // } else {
    //   return {
    //     status: 404,
    //     message: 'Product not found',
    //     data: null as any,
    //   };
    // }
  }

  async create(input: CreateProductInput): Promise<Product> {
    const newProduct = this.productsRepository.create(input);
    const data = await this.productsRepository.save(newProduct);
    return data;
    // if (!data) { 
    //   return {
    //     status: 404,
    //     message: 'Product not created',
    //     data: null as any,
    //   };
    // } else {
    //   return {
    //     status: 200,
    //     message: 'Product created successfully',
    //     data: data,
    //   }
    // }
  }

  async update(id: number, input: UpdateProductInput): Promise<ProductResponse> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      return {
        status: 404,
        message: `Product with ID ${id} not found`,
        data: null as any,
      };
    }
    Object.assign(product, input);
    const updatedProduct = await this.productsRepository.save(product);
    return {
      status: 200,
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  async remove(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    // return result.affected > 0;
    // return result.affected > 0 ? Promise.resolve() : Promise.reject();
    // return result.affected > 0 ? true : false;
  }
}