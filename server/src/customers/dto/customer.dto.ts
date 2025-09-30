import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, MinLength, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNumber()
  phone: string;

  @Field()
  @IsNumber()
  birthday: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @Field()
  @IsNotEmpty()
  hashedRt: string;

  @Field()
  @IsString()
  address: string;
}
