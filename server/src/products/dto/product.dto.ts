import { Field, ObjectType, InputType, Float, ID, OmitType, PartialType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsEmpty } from 'class-validator';
import { Product } from '../product.entity';


// @ObjectType()
// export class Product {
//   @Field(() => Number)
//   id: number;

//   @Field(() => String)
//   name: string;

//   @Field(() => Number)
//   category_id: number;

//   @Field(() => String)
//   description: string;

//   @Field(() => Float)
//   price: number;

//   @Field(() => String)
//   stock_quantity: number;

//   @Field(() => String)
//   image_url: string;

//   @Field(() => String)
//   created_at: string;

//   @Field(() => String)
//   updated_at: string;
// }

@InputType()
export class CreateProductInput extends OmitType(Product, ['id', 'created_at', 'updated_at']) {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNumber()
  @IsPositive()
  category_id: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  price: number;

  @Field()
  @IsNumber()
  @IsPositive()
  stock_quantity: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  image_url: string;
}

@InputType()
export class UpdateProductInput extends PartialType(
  CreateProductInput,
) {

  @Field(() => String)
  @IsString()
  @IsEmpty()
  name: string;

  @Field()
  @IsNumber()
  @IsPositive()
  @IsEmpty()
  category_id: number;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  @IsEmpty()
  price: number;

  @Field()
  @IsNumber()
  @IsPositive()
  @IsEmpty()
  stock_quantity: number;

  @Field(() => String)
  @IsString()
  @IsEmpty()
  description: string;

  @Field()
  @IsString()
  @IsEmpty()
  image_url: string;
}