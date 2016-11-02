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

  public organizerForm: FormGroup;
  
  constructor(private _service: CreateService, private fb: FormBuilder) {
    this.organizerForm = fb.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'person_code': ['', Validators.required],
      'address': ['', Validators.required],
      'phone': ['']
    });
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {}

  private formSubmit(values: any) {
    console.log(values);
    // this._service.sendData();
  }
}