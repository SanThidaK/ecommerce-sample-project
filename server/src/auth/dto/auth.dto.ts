import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CustomerModel } from '../../customers/customer.model';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => CustomerModel)
  user?: CustomerModel;
}

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field(() => CustomerModel)
  user?: CustomerModel;
}
