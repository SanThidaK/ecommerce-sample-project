import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') { 

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      console.error("AccessTokenGuard failed:", info?.message || info); 
      throw err || new UnauthorizedException("Invalid or missing Access Token in Authorization header.");
    }
    return user;
  }
}
