import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@Entity({ name: 'customers' })
@ObjectType()
export class CustomerModel {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  birthday: Date;

  @Field()
  password: string;

  @Field()
  address: string;

  @Field()
  createdAt: Date;
  
  @Field()
  updatedAt: Date;
}
