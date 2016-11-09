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
  public authWorkerForm: FormGroup;

  @Input() displayAuth: boolean;
  @Output() updateDisplay = new EventEmitter();

  constructor(private fb: FormBuilder, private router: Router, private _service: AuthService) {
    this.authUserForm = fb.group({
      'type': ['user'],
      'login': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.authWorkerForm = fb.group({
      'type': ['worker'],
      'login': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void { }

  private closeModal(): void {
    this.updateDisplay.emit(false);
  }

  private formSubmit(values: any) {
    if (values.type == 'user') {
      this._service.login(values).subscribe(res => {
        if (res.hasOwnProperty('error')) {
          alert(res['error']);
        } else {
          this.closeModal();
          this.router.navigate(['/request/list', res['id']]);
        }
      });
    }
  }
}