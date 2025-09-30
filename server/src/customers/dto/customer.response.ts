import { Field, ObjectType } from '@nestjs/graphql';
import { CustomerModel } from '../../customers/customer.model';

@ObjectType()
export class CustomerResponse {
  @Field(() => CustomerModel)
  user?: CustomerModel;
}
