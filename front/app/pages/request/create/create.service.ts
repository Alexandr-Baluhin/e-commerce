import { Injectable } from '@angular/core';

@Injectable()
export class CreateService {

  constructor() { }

  /**
   * @param
   * json - Object with data from form
   * @return
   * Object with formatted data
   */
  public formatDates(json: Object): Promise<Object> {
    return new Promise((resolve, reject) => {
      let result: Object = {};
      for (let key in json) {
        if (key == 'start_date' || key == 'end_date') {
          let arr = [];
          arr.push(json[key].getFullYear());
          arr.push(json[key].getMonth() + 1);
          arr.push(json[key].getDate());
          result[key] = arr.join('-');
        } else if (key == 'start_time' || key == 'end_time') {
          let arr = [];
          arr.push(json[key].getHours() < 10 ? '0' + json[key].getHours() : json[key].getHours());
          arr.push(json[key].getMinutes() < 10 ? '0' + json[key].getMinutes() : json[key].getMinutes());
          result[key] = arr.join(':');
        } else {
          result[key] = json[key];
        }
      }
      resolve(result);
    });
  }
}