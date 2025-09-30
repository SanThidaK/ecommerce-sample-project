import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse, LoginInput, LoginResponse } from './dto/auth.dto';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Customer } from '../customers/customer.entity';
import { CreateUserInput } from '../customers/dto/customer.dto';
import { Request, Response } from 'express';
import { AccessTokenGuard } from '../guards/access-token.guard';

type GqlContext = {
  req: Request & { 
    user?: Customer; 
    cookies?: Record<string, string> 
  };
  res: Response;
};

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  private setRefreshTokenCookie(res: Response, token: string) {
    // console.log('token --- ', token)
    // Use the Express Response object's .cookie() method directly
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (matching token expiry)
      path: '/',
      sameSite: 'lax',
    });
  }

  @Mutation(() => LoginResponse, { name: 'login' })
  async login(
    @Args('input') input: LoginInput,
    @Context() context: GqlContext,
  ): Promise<any> {
    const checkUser = await this.authService.validateUser(
      input.email,
      input.password,
    );

    const { accessToken, refreshToken } = await this.authService.getTokens(checkUser);

    if (!checkUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const data = await this.authService.login(checkUser);

    // Set the refresh token cookie
    this.setRefreshTokenCookie(context.res, refreshToken);

    return { accessToken, user: data };
  }

  @Mutation(() => LoginResponse, { name: 'register' })
  async register(
    @Args('input') input: CreateUserInput,
    @Context() context: GqlContext,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.register(input);
        
    // Set the refresh token cookie
    this.setRefreshTokenCookie(context.res, refreshToken);
    // return this.authService.register(input);
    return { accessToken, user };
  }

  @Query(() => Customer, { name: 'current_customer' })
  @UseGuards(AccessTokenGuard)
  async currentUser(@Context() context: any) {
    return context.req.user;
  }

  @UseGuards(AccessTokenGuard)
  @Mutation(() => AuthResponse)
  async refreshToken(
    @Context() context: GqlContext,
  ): Promise<AuthResponse> {
    // 1. Get the old refresh token from the request cookie 
    const oldRefreshToken = context.req.cookies ? context.req.cookies['refresh_token'] : undefined;
    
    // 2. The GqlAuthGuard/Strategy ensures 'context.req.user' is populated with the User entity.
    const { accessToken, refreshToken, user } = await this.authService.refreshTokens(
      oldRefreshToken,
      context.req.user as Customer, // Guard ensures this is defined
    );
    
    // 3. Set the NEW refresh token in the cookie (Token Rotation)
    this.setRefreshTokenCookie(context.res, refreshToken);

    return { accessToken, user };
  }

  /**
   * LOGOUT MUTATION: Clears the secure HttpOnly Refresh Token cookie.
   */
  @Mutation(() => Boolean)
  async logout(@Context() context: GqlContext): Promise<boolean> {
    // 1. Revoke the token hash on the backend for the currently authenticated user
    if (context.req.user) {
      // Note: This needs the user to be authenticated, which might require a guard 
      // on the logout mutation if you want to ensure a valid user is logging out.
      await this.authService.revokeRefreshToken(context.req.user.id);
    }
    
    // 2. Clear the cookie on the client side using the Express Response object
    context.res.cookie('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // Immediately clears the cookie
      path: '/',
      sameSite: 'lax',
    });
    
    return true; 
  }
}
