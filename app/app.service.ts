import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  
  constructor() {}

  public sendData() {
    alert('Data send!');
  }
}