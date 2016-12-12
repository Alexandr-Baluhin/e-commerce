import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmationService, Message } from 'primeng/primeng';

import { BackendService } from '../../../shared/services/backend.service';

import { AuthGuard } from '../../../shared/guards/auth.guard';

@Component({
  moduleId: module.id,
  selector: 'view-comp',
  styleUrls: ['./view.comp.css'],
  templateUrl: './view.comp.html'
})

export class ViewComp {

  private id: string;
  private userType: string;
  private userId: number;
  private sourceRequest: String[];
  private requestForm: FormGroup;
  private requestLawForm: FormGroup;
  private commentFromGov: string;

  private notifications: Message[];

  constructor(private backend: BackendService, 
    private guard: AuthGuard, 
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private confService: ConfirmationService) {
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

    this.route.params.subscribe(params => this.id = params['id']);
    this.guard.userType$.subscribe(type => {
      this.userType = type;
    });
    this.guard.userId$.subscribe(id => this.userId = id);    
    this.notifications = [];
    this.commentFromGov = '';
  }

  public ngOnInit(): void {
    this.backend.getRequest('request', [this.id])
      .subscribe(res => {
        this.sourceRequest = res;
        if (this.userType == 'user') this.commentFromGov = res['gov_callback_text'];
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

  private return(): void {
    this.router.navigate(['/request/list']);
  }

  private approve(comment) {
    let response = {};
    response['user'] = this.sourceRequest['belongs_to'];
    response['employee'] = this.userId;
    response['request'] = {};
    response['request']['id'] = this.sourceRequest['id'];
    response['request']['decision'] = 'Apstiprināts';
    response['request']['callbackText'] = comment;
    this.confService.confirm({
      message: 'Jūs tieši gribāt pieņemt šo lēmumu?',
      accept: () => {
        this.backend.putRequest('request', response)
          .subscribe(res => {
            if (res.hasOwnProperty('success')) {
              this.notifications.push({ severity: 'success', detail: res['success'] });
              setTimeout(() => this.router.navigate(['/request/list']), 3000);
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
    response['employee'] = this.userId;
    response['request'] = {};
    response['request']['id'] = this.sourceRequest['id'];
    response['request']['decision'] = 'Noraidīts';
    response['request']['callbackText'] = comment;
    this.confService.confirm({
      message: 'Jūs tieši gribāt pieņemt šo lēmumu?',
      accept: () => {
        this.backend.putRequest('request', response)
          .subscribe(res => {
            if (res.hasOwnProperty('success')) {
              this.notifications.push({ severity: 'success', detail: res['success'] });
              setTimeout(() => this.router.navigate(['/request/list']), 3000);            
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