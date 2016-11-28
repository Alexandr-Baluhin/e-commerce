import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const URL: string = 'http://localhost:8080/'

@Injectable()
export class CreateService {

  constructor(private http: Http) { }

  /**
   * @param
   * data - Object with data from form
   * @return
   * Response from server
   */
  public sendData(data: Object): Observable<String[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(URL + 'request', data, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

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

  /**
   * @param
   * error - Any error response
   * @return
   * Observable.throw with error
   */
  private handleError(error: any) {
    console.log('error occured')
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}