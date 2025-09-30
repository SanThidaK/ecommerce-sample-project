import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput, UpdateProductInput } from './dto/product.dto';
import { ProductResponse } from './dto/product.response';
import { Product } from './product.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product], { name: 'all_products' })
  async products(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => ProductResponse, { name: 'find_by_id' })
  async product(@Args('id', { type: () => Int }) id: number): Promise<ProductResponse> {
    const data = await this.productsService.findOneById(id);
    // const res = {
    //   status: data?.id ? 200 : 404,
    //   message: data?.id ? 'Product found successfully' : 'Product not found',
    //   data: data?.id ? data : null as any,
    // }
    return data as any;
  }


  @Mutation(() => Product, { name: 'create_product' })
  async createProduct(@Args('input') input: CreateProductInput): Promise<Product> {
    return this.productsService.create(input);
  }

  @Mutation(() => Product, { name: 'update_product' })
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateProductInput,
  ): Promise<ProductResponse> {
    return this.productsService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'delete_product' })
  async deleteProduct(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    try {
      await this.productsService.remove(id);
      return true;
    } catch (e) {
      return false;
    }
  }
}



// import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
// import { Product } from './product.model';
// // import { ProductsService } from './products.service';
// import { CreateProductInput } from './dto/create-product.input';

// @Resolver(() => Product)
// export class ProductsResolver {
//   // constructor(private readonly productsService: ProductsService) {}

//   @Query(() => [Product], { name: 'all_products' })
//   GetAllProducts() {
//     const data = [
//       {
//         id: 1,
//         name: "Rouge Dior Lipstick",
//         description: "This is a sample product",
//         price: 19.99,
//         stock_quantity: 100,
//         image_url: "https://images.unsplash.com/photo-1587303876752-91efb6315dcc?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Um91Z2UlMjBEaW9yJTIwTGlwc3RpY2t8ZW58MHx8MHx8fDA%3D",
//       },
//       {
//         id: 2,
//         name: "Calvin Klein",
//         description: "This is a sample product",
//         price: 19.99,
//         stock_quantity: 100,
//         image_url: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=300&h=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoYW5lbHxlbnwwfHwwfHx8MA%3D%3D",
//       },
//       {
//         id: 3,
//         name: "Chanel",
//         description: "This is a sample product",
//         price: 19.99,
//         stock_quantity: 100,
//         image_url: "https://images.unsplash.com/photo-1623609163868-7e3228f7135c?w=300&h=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoYW5lbHxlbnwwfHwwfHx8MA%3D%3D",
//       },
//       {
//         id: 4,
//         name: "Calvin Klein",
//         description: "This is a sample product",
//         price: 19.99,
//         stock_quantity: 100,
//         image_url: "https://images.unsplash.com/photo-1623609163868-7e3228f7135c?w=300&h=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNoYW5lbHxlbnwwfHwwfHx8MA%3D%3D",
//       }
//     ]
//     return data
//     // return this.productsService.findAll();
//   }

  // @Query(() => Product, { name: 'product' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.productsService.findOne(id);
  // }

  // @Mutation(() => Product)
  // createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
  //   return this.productsService.create(createProductInput);
  // }
// }


// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { Product } from './product.model';
// import { v4 as uuidv4 } from 'uuid';

// @Resolver(() => Product)
// export class ProductsResolver {
//   private products: Product[] = [];

//   @Query(() => [Product], { name: 'getAllProducts' })
//   getAllProducts(): Product[] {
//     // return this.products;
//     return {
//       id: 1,
//       name: "Sample Product",
//       description: "This is a sample product",
//       price: 19.99,
//       stock_quantity: 100,
//       image_url: "http://example.com/image.png",
//     }
//   }

//   @Query(() => Product, { name: 'getProductById', nullable: true })
//   getProductById(@Args('id') id: number): Product | undefined {
//     return this.products.find(product => product.id === id);
//   }

//   @Mutation(() => Product, { name: 'createProduct' })
//   createProduct(
//     @Args('name') name: string,
//     @Args('category_id') category_id: number,
//     @Args('image_url') image_url: string,
//     @Args('description') description: string,
//     @Args('price') price: number,
//     @Args('stock_quantity') stock_quantity: number,
//     @Args('created_at') created_at: number,
//     @Args('updated_at') updated_at: number,
//   ): Product {
//     const newProduct: Product = {
//       id: uuidv4(),
//       name,
//       description,
//       price,
//       stock_quantity,
//       image_url,
//       category_id,
//       created_at: new Date(),
//       updated_at: new Date(),
//     };
//     this.products.push(newProduct);
//     return newProduct;
//   }

//   @Mutation(() => Product, { name: 'updateProduct', nullable: true })
//   updateProduct(
//     @Args('id') id: number,
//     @Args('name', { nullable: true }) name?: string,
//     @Args('description', { nullable: true }) description?: string,
//     @Args('price', { nullable: true }) price?: number,
//     @Args('stock_quantity', { nullable: true }) stock_quantity?: number,
//   ): Product | undefined {
//     const product = this.products.find(p => p.id === id);
//     if (!product) return undefined;

//     if (name) product.name = name;
//     if (description) product.description = description;
//     if (price) product.price = price;
//     if (stock_quantity) product.stock_quantity = stock_quantity;

//     return product;
//   }

//   @Mutation(() => Boolean, { name: 'deleteProduct' })
//   deleteProduct(@Args('id') id: number): boolean {
//     const index = this.products.findIndex(p => p.id === id);
//     if (index === -1) return false;

//     this.products.splice(index, 1);
//     return true;
//   }
// }