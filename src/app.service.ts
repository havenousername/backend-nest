import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  getUsers() {
    return [
      { id: 1, name: 'VL' },
      { id: 1, name: 'VS' },
    ];
  }
}
