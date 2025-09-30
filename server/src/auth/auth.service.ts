import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../customers/customer.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from '../customers/dto/customer.dto';
import { CustomersService } from '../customers/customers.service';

interface AuthResponsePayload {
  accessToken: string;
  refreshToken: string;
  user: Customer;
}

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService, private CustomersService: CustomersService) {}

  async getTokens(user: Customer) {
    // Payload for both tokens
    const payload = { id: user.id, email: user.email };

    // Access Token: Short-lived (e.g., 15 minutes), used for resource access.
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET, 
      expiresIn: '15m', 
    });

    // Refresh Token: Long-lived (e.g., 7 days), used only for refreshing the access token.
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET, 
      expiresIn: '7d', 
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    // Hash the refresh token before storing it for security
    const hash = await bcrypt.hash(rt, 10);
    // This calls the method we added to UsersService
    await this.CustomersService.updateHashedRt(userId, hash);
  }
  
  async revokeRefreshToken(userId: string): Promise<void> {
    await this.CustomersService.updateHashedRt(userId, "");
  }

  // This function validates the user's credentials.
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.CustomersService.findOneByEmail(email);
    if (user && user.email === email) {
      // Omit the password from the returned object for security.
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // This function signs and generates a JWT token for the user.
  async login(user: any): Promise<any> {
    const payload = { email: user.email, password: user.password };

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    }
  }

  async register(input: CreateUserInput) {

    const existingUser = await this.CustomersService.findOneByEmail(input.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    const hashed = await bcrypt.hash(input.password, 10);

    const user: Customer = await this.CustomersService.create({ ...input, password: hashed });

    // const accessToken = this.jwtService.sign({ sub: user.id, email: user.email });
    const { accessToken, refreshToken } = await this.getTokens(user);

    // 3. Store the hashed refresh token for token rotation
    await this.updateRtHash(user.id, refreshToken);

    // 4. Return tokens and user
    // return { accessToken, refreshToken, user };
    
    return {
      accessToken,
      refreshToken, 
      user: { 
        id: user.id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email,
        phone: user.phone
      },
    };
  }

  async refreshTokens(oldRefreshToken: string, user: Customer): Promise<AuthResponsePayload> {
    // 1. Critical Security Check: Is the token hash stored and does it match?
    if (!user.hashedRt || !(await bcrypt.compare(oldRefreshToken, user.hashedRt))) {
      // If the hash doesn't match, it means the token was reused, potentially stolen.
      // For strong security, you might clear ALL tokens for this user here.
      await this.revokeRefreshToken(user.id);
      throw new ForbiddenException('Access Denied: Invalid or revoked refresh token.');
    }

    // 2. Generate NEW tokens using your existing helper
    const { accessToken, refreshToken } = await this.getTokens(user);

    // 3. Update the stored refresh token hash with the new one (Rotation)
    await this.updateRtHash(user.id, refreshToken);

    // 4. Return the new tokens and user data
    return { accessToken, refreshToken, user };
  }

}
