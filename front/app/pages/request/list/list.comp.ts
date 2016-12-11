import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ListService } from './list.service';
import { BackendService } from '../../../shared/services/backend.service';

@Component({
  moduleId: module.id,
  selector: 'list-comp',
  styleUrls: ['./list.comp.css'],
  templateUrl: './list.comp.html'
})

export class ListComp {

  private userType: Object;
  private id: Object;

  private requests: Object[];

  constructor(private _service: ListService, private backend: BackendService, private router: Router, private route: ActivatedRoute) {
    this.requests = [];
    this.route.params.subscribe(params => {
      this.userType = { "name": "type", "value": params['user'] };
      this.id = { "name": "id", "value": params['id'] };
    });
  }

  public ngOnInit(): void {
    this.backend.getRequest('request/list', null, [this.userType, this.id]).subscribe(res => {
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