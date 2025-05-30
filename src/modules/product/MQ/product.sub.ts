import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';

@Controller()
export class ProductSubController {
  constructor() {}

  // update author when user updated
  @RabbitSubscribe({
    exchange: 'auth_api',
    routingKey: 'user.*',
    queue: 'user_created',
  })
  public async userCreatedListener(user: any) {
    try {
      console.log('user created event captured: ', user);

      return new Nack(false);
    } catch (error) {
      console.log(error);
      return new Nack(true);
    }
  }
}
