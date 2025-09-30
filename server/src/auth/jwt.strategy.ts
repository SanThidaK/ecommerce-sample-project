import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomersService } from '../customers/customers.service';

export interface JwtPayload {
  id: string;
  email: string;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly customerService: CustomersService) {
    super({
      // Extract the JWT from the Authorization header (Bearer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET, 
    });
  }

  /**
   * This method runs after the token is successfully validated (signature and expiration).
   * It takes the decoded JWT payload and loads the full user object.
   */
  async validate(payload: JwtPayload) {
    // We look up the user by ID from the database to ensure they still exist.
    const user = await this.customerService.findById(payload.id);

    if (!user) {
      // Throw an error if the user is not found (will result in 401 Unauthorized)
      throw new Error('Unauthorized'); 
    }

    // This 'user' object is attached to context.req.user or context.getUser()
    return user; 
  }
}
