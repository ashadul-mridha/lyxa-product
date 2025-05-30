import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { RabbitmqService } from '../../config/rabbitmq/rabbitmq.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.rabbitmqService.request(
        'auth_rpc',
        'validate_token',
        { token },
      );
      //   console.log('User from RabbitMQ:', user);

      if (!user) {
        throw new UnauthorizedException();
      }

      request['user'] = user;
      request['token'] = token;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
