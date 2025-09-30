import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../product.entity';

@ObjectType()
export class ProductResponse {
  @Field(() => Int)
  status: number;

  @Field(() => String)
  message: string;

  @Field(() => Product, { nullable: true })
  data: Product | Product[] | null;
}

// @ObjectType()
// export class ProductResponse {
//   @Field(() => Product, { nullable: true, description: 'The actual product data.' })
//   data: Product | null;
// }

/**
 * Defines the response wrapper for a list of Product items: { data: [Product] }
 */
@ObjectType()
export class ProductListResponse {
  @Field(() => [Product], { description: 'The list of product data.' })
  data: Product[];
}

/**
 * Defines a simple response for delete operations.
 */
@ObjectType()
export class DeleteResponse {
  @Field(() => Int)
  id: number;

  @Field()
  success: boolean;

  @Field()
  message: string;
}
