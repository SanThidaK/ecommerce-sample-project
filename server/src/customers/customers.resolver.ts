import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Customer } from './customer.entity';
import { CustomersService } from './customers.service';
import { CreateUserInput } from './dto/customer.dto';
import { AccessTokenGuard } from 'src/guards/access-token.guard';

@Resolver(() => Customer)
export class CustomersResolver {

  constructor(private CustomersService: CustomersService) {}

  @UseGuards(AccessTokenGuard) 
  @Query(() => Customer, { name: 'currentCustomer' })
  currentUser(@Context() context): Customer {
    // The user object is attached to the request context by the guard
    return context.req.user;
  }

  @UseGuards(AccessTokenGuard)
  @Query(() => Customer, { name: 'find_customer_by_email' })
  async getByEmail(@Args('email', { type: () => String }) email: string): Promise<any> {
    const data = this.CustomersService.findOneByEmail(email);
    return data;
  }

  @Mutation(() => Customer, { name: 'createCustomer' })
  async createCustomer(@Args('input') input: CreateUserInput): Promise<Customer> {
    return this.CustomersService.create(input);
  }

}
