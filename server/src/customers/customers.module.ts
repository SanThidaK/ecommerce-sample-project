import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
  ],
  providers: [CustomersService, CustomersResolver],
  exports: [CustomersService], // Export the service so other modules (like AuthModule) can use it.
})
export class CustomersModule {}
