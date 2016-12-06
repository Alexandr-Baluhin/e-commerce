import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ViewService } from './view.service';

@Component({
  moduleId: module.id,
  selector: 'view-comp',
  styleUrls: ['./view.comp.css'],
  templateUrl: './view.comp.html'
})

export class ViewComp {
  
  private id: string;
  private request: Object;

  constructor(private _service: ViewService, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.id = this.route.params['id'];
    this._service.getRequest(this.id)
      .subscribe(res => {
        this.request = res;
      })
  }

  public ngOnDestroy(): void {}

}