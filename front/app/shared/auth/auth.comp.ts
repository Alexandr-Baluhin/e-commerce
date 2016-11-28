import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  moduleId: module.id,
  selector: 'auth-comp',
  styleUrls: ['./auth.comp.css'],
  templateUrl: './auth.comp.html'
})

export class AuthComp {

  public authUserForm: FormGroup;
  public authEmployeeForm: FormGroup;

  private userError: string;
  private employeeError: string;

  @Input() displayAuth: boolean;
  @Output() updateDisplay = new EventEmitter();

  constructor(private fb: FormBuilder, private router: Router, private _service: AuthService) {
    this.authUserForm = fb.group({
      'type': ['user'],
      'email': ['', Validators.required],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });
    this.authEmployeeForm = fb.group({
      'type': ['employee'],
      'email': ['', Validators.required],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    });
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void { }

  private closeModal(): void {
    this.updateDisplay.emit(false);
  }

  private formSubmit(values: any) {
    this._service.login(values).subscribe(res => {
      if (res.hasOwnProperty('error')) {
        this[values.type + 'Error'] = res['error'];
      } else {
        this.closeModal();
        this.router.navigate(['/request/list', res['id']]);
      }
    });
  }
}