import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { CustomersModule } from '../customers/customers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CustomersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // Retrieve the secret from the environment variable
        secret: configService.get<string>('JWT_ACCESS_SECRET'), 
        signOptions: { expiresIn: '15m' }, // Use a short expiration time for access token
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
