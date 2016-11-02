import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'header-comp',
  styleUrls: ['./header.comp.css'],
  templateUrl: './header.comp.html'
})

export class HeaderComp {

  public authForm: FormGroup;

  private displayAuth: boolean;
  
  constructor(private fb: FormBuilder) {
    this.authForm = fb.group({
      'login': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    this.displayAuth = false;
  }

  public ngOnDestroy(): void {}

  private showDialog(): void {
    this.displayAuth = true;
  }

  private formSubmit(values: any) {
    console.log(values);
  }
}