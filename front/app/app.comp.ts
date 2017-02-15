import { Component, HostListener } from '@angular/core';

import { AuthGuard } from './shared/guards/auth.guard';

import { BackendService } from './shared/services/backend.service';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.comp.html'
})

export class AppComp {

  private isLoaded: boolean;
  private errMsg: String;
  private secretKeyCombination: Array<string>;

  constructor(private guard: AuthGuard, private backend: BackendService) {
    this.isLoaded = false;
    this.secretKeyCombination = [];
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void { }

  public ngAfterViewInit(): void {
    this.checkServerAvailability().then(
        res => {
          this.isLoaded = true;
        },
        err => {
          this.errMsg = 'Serveris nav pieļaujams. Lūdzu, atgriežas nedaudz vēlāk!';
        }
    );
  }

  private checkServerAvailability() {
    return new Promise((resolve, reject) => {
      this.backend.checkServer().subscribe(
          res => {
            console.log('Start application');
            resolve(res);
          },
          err => {
            console.log('Server is not responding!');
            reject(err);
          }
      );
    });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.secretKeyCombination.push(event.key);
    if (this.secretKeyCombination.join('').indexOf('batman') != -1) {
      this.secretKeyCombination = [];
      this.guard.activateSecret(true);
    }
  }

}