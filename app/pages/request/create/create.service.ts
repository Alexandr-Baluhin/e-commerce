import { Injectable } from '@angular/core';

@Injectable()
export class CreateService {
  
  constructor() {}

  public sendData() {
    alert('Data send!');
  }
}