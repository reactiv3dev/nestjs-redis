import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheServiceService } from './cache-service/cache-service.service';
import { UserModule } from './user/user.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    //cache-module uses in memory caching mechanism
    CacheModule.register({
      max: 100, //max number of items we are  willing to cache in memo
      ttl: 60000, //time to live expressed in milliseconds if dont want to expire set to 0
      isGlobal: true, //module is globally available
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, CacheServiceService],
})
export class AppModule {}
