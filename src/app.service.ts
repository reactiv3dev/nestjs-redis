import { Injectable } from '@nestjs/common';
import { CacheServiceService } from './cache-service/cache-service.service';

@Injectable()
export class AppService {

  constructor(private readonly cacheService: CacheServiceService){}
  getHello(): string {
    return 'Hello World!';
  }
}
