import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  /**
   * Calls remote API and simulates expensive calls (I/O, DB, Network)
   * @returns user[]
   */
  async findAll() {
    this.logger.log(`${UserService.name} called, making expensive call.`);
    const data = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'get',
    });
    const json_data = await data.json();
    return json_data;
  }

  async findOne(id: string) {
    this.logger.log(`${UserService.name} called, making expensive call.`);
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      {
        method: 'get',
      },
    );
    const json_data = await data.json();
    return json_data;
  }
}
