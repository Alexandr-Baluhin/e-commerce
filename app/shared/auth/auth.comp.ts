import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'auth-comp',
  styleUrls: ['./auth.comp.css'],
  templateUrl: './auth.comp.html'
})

export class AuthComp {

  public authForm: FormGroup;

  @Input() displayAuth: boolean;
  @Output() updateDisplay = new EventEmitter();
  
  constructor(private fb: FormBuilder) {
    this.authForm = fb.group({
      'login': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}

  private closeModal(): void {
    this.updateDisplay.emit(this.displayAuth);
  }

  private formSubmit(values: any) {
    console.log(values);
  }
}