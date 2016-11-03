import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';

import { CreateService } from './create.service';

@Component({
  moduleId: module.id,
  selector: 'create-comp',
  styleUrls: ['./create.comp.css'],
  templateUrl: './create.comp.html'
})

export class CreateComp {

  public requestForm: FormGroup;

  constructor(private _service: CreateService, private fb: FormBuilder) {
    this.requestForm = fb.group({
      'organizer': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'surname': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^\d+$')])]
      }),
      'guard': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'surname': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^\d+$')])]
      }),
      'social_guard': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'surname': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^\d+$')])]
      }),
      'support': fb.group({
        'name': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'surname': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        'person_code': ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{6}\-[0-9]{5}')])],
        'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
        'phone': ['', Validators.compose([Validators.minLength(8), Validators.pattern('^\d+$')])]
      }),
      'description': ['', Validators.compose([Validators.required, Validators.maxLength(250)])],
      'address': ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      'start_date': ['', Validators.required],
      'end_date': ['', Validators.required],
      'start_time': ['', Validators.required],
      'end_time': ['', Validators.required],
      'visitors': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'participiants': ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])],
      'dangerous': ['', Validators.maxLength(250)],
      'gov_callback': ['', Validators.maxLength(250)]
    });
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void { }

  private formSubmit(values: any) {
    console.log(values);
    // this._service.sendData();
  }
}