import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  HttpCode,
  Query,
  NotFoundException,
} from '@nestjs/common';

import { CacheServiceService } from './cache-service/cache-service.service';

@Controller()
export class AppController {
  constructor(private readonly cacheService: CacheServiceService) {}

  @Get()
  getAllKeys() {
    return this.cacheService.cacheStore();
  }

  @Get(':key')
  getValueByKey(@Query('key') key: string) {
    return this.cacheService.getCacheKey(key);
  }

  @Post(':key')
  @HttpCode(201)
  setKeyAndValue(@Body() body: { key: string; value: string }) {
    const { key, value } = body;
    if (!key || !value) {
      throw new NotFoundException(
        `Key: string, Value: string JSON must be provided`,
      );
    }
    this.cacheService.setCacheKey(key, value);
    return this.cacheService.getCacheKey(key);
  }

  @Delete(':key')
  deleteValueByKey(@Query('key') key: string) {
    this.cacheService.deleteCacheKey(key);
  }

  @Delete()
  deleteAllKeysAndValues() {
    this.cacheService.resetCache();
  }
}
