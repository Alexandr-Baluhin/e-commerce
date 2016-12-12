import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService, Message } from 'primeng/primeng';

import { BackendService } from '../../../shared/services/backend.service';

import { AuthGuard } from '../../../shared/guards/auth.guard';

@Component({
  moduleId: module.id,
  selector: 'list-comp',
  styleUrls: ['./list.comp.css'],
  templateUrl: './list.comp.html'
})

export class ListComp {

  private notifications: Message[];

  private userType: string;
  private userId: number;

  private userTypeHeader: Object;
  private userIdHeader: Object;

  private requests: Object[];

  constructor(private router: Router, private confService: ConfirmationService,
    private backend: BackendService, private guard: AuthGuard) {
    this.requests = [];
    this.notifications = [];
    this.guard.userType$.subscribe(type => this.userType = type);
    this.guard.userId$.subscribe(id => this.userId = id);
  }

  public ngOnInit(): void {
    this.userTypeHeader = { name: "type", value: this.userType };
    this.userIdHeader = { name: "id", value: this.userId };
  }

  public ngOnDestroy(): void { }

  private getList(): void {
    this.backend.getRequest('request/list', null, [this.userTypeHeader, this.userIdHeader]).subscribe(res => {
      if (res.length != 0) {
        this.formatDate(res).then(res => this.requests = res);
      }
    });
  }

  private view(request): void {
    this.router.navigate(['/request', request.id]);
  }

  private approve(request: Object): void {
    let response = {};
    response['user'] = request['belongs_to'];
    response['employee'] = this.userId;
    response['request'] = {};
    response['request']['id'] = request['id'];
    response['request']['decision'] = 'Apstiprināts';
    this.confService.confirm({
      message: 'Jūs tieši gribāt pieņemt šo lēmumu?',
      accept: () => {
        this.backend.putRequest('request', response)
          .subscribe(res => {
            if (res.hasOwnProperty('success')) {
              this.notifications.push({ severity: 'success', detail: res['success'] });
              this.getList();
            } else {
              this.notifications.push({ severity: 'error', detail: res['error'] });
            }
          },
          err => this.notifications.push({ severity: 'error', detail: 'Kļūda savienojumā!' }));
      }
    });
  }

  private decline(request: Object): void {
    let response = {};
    response['user'] = request['belongs_to'];
    response['employee'] = this.userId;
    response['request'] = {};
    response['request']['id'] = request['id'];
    response['request']['decision'] = 'Noraidīts';
    this.confService.confirm({
      message: 'Jūs tieši gribāt pieņemt šo lēmumu?',
      accept: () => {
        this.backend.putRequest('request', response)
          .subscribe(res => {
            if (res.hasOwnProperty('success')) {
              this.notifications.push({ severity: 'success', detail: res['success'] });
              this.getList();              
            } else {
              this.notifications.push({ severity: 'error', detail: res['error'] });
            }
          },
          err => this.notifications.push({ severity: 'error', detail: 'Kļūda savienojumā!' }));
      }
    });
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