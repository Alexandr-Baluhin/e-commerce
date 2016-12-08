import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ListService } from './list.service';
import { BackendService } from '../../../shared/services/backend.service';

@Component({
  moduleId: module.id,
  selector: 'list-comp',
  styleUrls: ['./list.comp.css'],
  templateUrl: './list.comp.html'
})

export class ListComp {

  private requests: Object[];

  constructor(private _service: ListService, private backend: BackendService, private router: Router,) {
    this.requests = [];
  }

  public ngOnInit(): void {
    this.backend.getRequest('request/list').subscribe(res => {
      if (res.length != 0) {
        this.formatDate(res).then(res => this.requests = res);
      }
    });
  }

  public ngOnDestroy(): void { }

  public view(request): void {
    this.router.navigate(['/request', request.id]);
  }

  public approve(): void {
    console.log('Approved!');
  }

  public decline(): void {
    console.log('Declined!');
  }

  private formatDate(list): Promise<Array<Object>> {
    return new Promise((resolve, reject) => {
      let result = [];
      list.forEach((request) => {
        let temp = request['create_date'].split('T');
        request['create_date'] = temp[0] + ' ' + temp[1].split('.00')[0];
        result.push(request);
      });
      resolve(result);
    });
  }
}