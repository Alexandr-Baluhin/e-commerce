import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'header-comp',
  styleUrls: ['./header.comp.css'],
  templateUrl: './header.comp.html'
})

export class HeaderComp {

  private isDisplayAuth: boolean;
  
  constructor() {}

  public ngOnInit(): void {
    this.isDisplayAuth = false;
  }

  public ngOnDestroy(): void {}

  private toggleDisplay(value: boolean): void {
    this.isDisplayAuth = value;
  }

  private showDialog(): void {
    this.isDisplayAuth = true;
  }
}