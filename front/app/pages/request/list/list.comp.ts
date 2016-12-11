import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmationService, Message } from 'primeng/primeng';

import { BackendService } from '../../../shared/services/backend.service';

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

  private requests: Object[];

  constructor(private backend: BackendService, private router: Router,
    private route: ActivatedRoute, private confService: ConfirmationService) {
    this.requests = [];
    this.route.params.subscribe(params => {
      this.userType = params['user'];
      this.userId = params['id'];
    });
    this.notifications = [];
  }

  public ngOnInit(): void {
    let userTypeHeader = { "name": "type", "value": this.userType };
    let userIdHeader = { "name": "id", "value": this.userId };
    this.backend.getRequest('request/list', null, [userTypeHeader, userIdHeader]).subscribe(res => {
      if (res.length != 0) {
        this.formatDate(res).then(res => this.requests = res);
      }
    });
  }

  public ngOnDestroy(): void { }

  public view(request): void {
    this.router.navigate(['/request', request.id]);
  }

  public approve(request: Object): void {
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
            } else {
              this.notifications.push({ severity: 'error', detail: res['error'] });
            }
          },
          err => this.notifications.push({ severity: 'error', detail: 'Kļūda savienojumā!' }));
      }
    });
  }

  public decline(request: Object): void {
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