import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 *  Service Dealing with app config based operations
 *
 * @method name()
 * @method env()
 * @method url()
 * @method port()
 * @method version()
 *
 * @author Ashadul Mridha <https://github.com/ashadul-mridha>
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('app.name');
  }

  get env(): string {
    return this.configService.get<string>('app.env');
  }

  get url(): string {
    return this.configService.get<string>('app.url');
  }

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }
  get version(): string {
    return this.configService.get<string>('app.version');
  }
}
