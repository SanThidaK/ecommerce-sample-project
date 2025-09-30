import { Injectable } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CreateUserInput } from './dto/customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer)
    private usersRepository: Repository<Customer>,
  ) {}

  // This function is a placeholder for creating a new user in a database.
  // In a real application, you would use a database client here.
  async create(input: CreateUserInput): Promise<Customer> {
    const user = this.usersRepository.create(input);
    const data = await this.usersRepository.save(user);
    return data;
  }


  // This function is a placeholder for finding a user by their username.
  async findOneByEmail(email: string): Promise<Customer | any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  // This function is a placeholder for finding a user by their ID.
  async findById(id: string): Promise<Customer | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user || null;
  }

  async updateHashedRt(userId: string, rtHash: string | ""): Promise<void> {
    await this.usersRepository.update(
      { id: userId }, 
      { hashedRt: rtHash }
    );
  }

  // mutation ForgotPassword($email: String!) {
  // forgotPassword(email: $email) {
  // message
  // }
  // }


  // mutation ResetPassword($token: String!, $newPassword: String!) {
  // resetPassword(token: $token, newPassword: $newPassword) {
  // message
  // }
  // }
}
