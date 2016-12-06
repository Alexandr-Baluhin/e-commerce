import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmationService, Message } from 'primeng/primeng';

import { ViewService } from './view.service';

@Component({
  moduleId: module.id,
  selector: 'view-comp',
  styleUrls: ['./view.comp.css'],
  templateUrl: './view.comp.html'
})

export class ViewComp {

  private id: string;
  private sourceRequest: String[];
  private requestForm: FormGroup;
  private requestLawForm: FormGroup;

  private notifications: Message[];

  constructor(private _service: ViewService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private confService: ConfirmationService) {
    // Form for usual persons
    this.requestForm = fb.group({
      'organizer': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'guard': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'social_guard': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'support': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'description': ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      'start_date': ['', Validators.required],
      'end_date': ['', Validators.required],
      'start_time': ['', Validators.required],
      'end_time': ['', Validators.required],
      'visitors': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'participants': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'dangerous': ['', Validators.maxLength(250)],
      'gov_dangerous_response': ['', Validators.maxLength(250)],
      'persons_type': ['physical']
    });
    // Form for law persons
    this.requestLawForm = fb.group({
      'organizer': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'guard': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'social_guard': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'support': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^[0-9]+$')])]
      }),
      'description': ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      'start_date': ['', Validators.required],
      'end_date': ['', Validators.required],
      'start_time': ['', Validators.required],
      'end_time': ['', Validators.required],
      'visitors': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'participants': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'dangerous': ['', Validators.maxLength(250)],
      'gov_dangerous_response': ['', Validators.maxLength(250)],
      'persons_type': ['legal']
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.notifications = [];
  }

  public ngOnInit(): void {
    this._service.getRequest(this.id)
      .subscribe(res => {
        this.sourceRequest = res;
        this.preFormatRequest(res).then(
          res => {
            this.formatRequest(res).then(
              res => {
                if (res['persons_type'] == 'physical') {
                  this.requestForm.setValue(res);
                  this.requestForm.disable();
                } else {
                  this.requestLawForm.setValue(res);
                  this.requestLawForm.disable();
                }
              }
            )
          }
        )
      }
      )
  }

  public ngOnDestroy(): void { }

  private approve(comment) {
    let response = {};
    response['user'] = this.sourceRequest['belongs_to'];
    response['employee'] = 1;
    response['request'] = {};
    response['request']['id'] = this.sourceRequest['id'];
    response['request']['decision'] = 'Apstiprināts';
    response['request']['callbackText'] = comment;
    this.confService.confirm({
      message: 'Jūs tieši gribāt pieņemt šo lēmumu?',
      accept: () => {
        this._service.sendData(response)
          .subscribe(res => {
            if (res.hasOwnProperty('success')) {
              this.notifications.push({ severity: 'success', detail: res['success'] });
              setTimeout(() => this.router.navigate(['/request/list/1']), 3000);
            } else {
              this.notifications.push({ severity: 'error', detail: res['error'] });
            }
          },
          err => this.notifications.push({ severity: 'error', detail: 'Kļūda savienojumā!' }));
      }
    });
  }

  private decline(comment) {
    let response = {};
    response['user'] = this.sourceRequest['belongs_to'];
    response['employee'] = 1;
    let request = {};
    request['id'] = this.sourceRequest['id'];
    request['decision'] = 'Noraidīts';
    request['callbackText'] = comment;
    response['request'] = request;
    this.confService.confirm({
      message: 'Jūs tieši gribāt pieņemt šo lēmumu?',
      accept: () => {
        this._service.sendData(response)
          .subscribe(res => {
            if (res.hasOwnProperty('success')) {
              this.notifications.push({ severity: 'success', detail: res['success'] });
              setTimeout(() => this.router.navigate(['/request/list/1']), 3000);            
            } else {
              this.notifications.push({ severity: 'error', detail: res['error'] });
            }
          },
          err => this.notifications.push({ severity: 'error', detail: 'Kļūda savienojumā!' }));
      }
    });
  }

  private preFormatRequest(request) {
    return new Promise((resolve, reject) => {
      let result = {};
      for (let key in request) {
        if (['belongs_to', 'checked_by', 'checked_date', 'create_date', 'files', 'gov_callback_text', 'id',
          'status', 'written_to'].indexOf(key) == -1) {
          result[key] = request[key];
        }
      }
      resolve(result);
    });
  }

  private formatRequest(request) {
    return new Promise((resolve, reject) => {
      let result = {};
      for (let key in request) {
        if (typeof (request[key]) == 'object') {
          delete request[key]['id'];
        }

        if (['start_date', 'end_date'].indexOf(key) != -1) {
          request[key] = request[key].substr(0, 10);
        }

        result[key] = request[key];
      }
      resolve(result);
    });
  }
}