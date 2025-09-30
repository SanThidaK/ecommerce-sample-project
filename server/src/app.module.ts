import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      // Add validation schema here if desired
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      context: ({ req, res }) => ({ req, res }), 
    }),
    TypeOrmModule.forRoot({
      type: 'mysql', // Specifies the database type
      host: 'localhost', // The host where the database is running
      // host: 'host.docker.internal', // Correct host to connect to a service on the Windows machine from within WSL Docker
      port: 3306, // The port for the database
      username: 'root', // The database username
      password: '123456', // The database password
      database: 'ecommerce_sql', // Replace with your database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Discovers all entity files
      synchronize: true, // Auto-creates database schema (use with caution in production)
    }),
    ProductsModule, 
    AuthModule,
    CustomersModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
