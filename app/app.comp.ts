import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';

import { AppService } from './app.service';

@Component({
  moduleId: module.id,
  selector: 'app',
  styleUrls: ['./app.comp.css'],
  templateUrl: './app.comp.html'
})

export class AppComponent {

  public organizerForm: FormGroup;
  
  constructor(private _service: AppService, private fb: FormBuilder) {
    this.organizerForm = fb.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'person_code': ['', Validators.required],
      'address': ['', Validators.required],
      'phone': ['']
    });
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}

  private formSubmit(values: any) {
    console.log(values);
    // this._service.sendData();
  }
}