import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WrapperService {
  active: string = 'dashboard';

  private activeStatusListener = new Subject<string>();

  constructor() { }

  getActiveStatus() {
    return this.active;
  }

  getActiveStatusListener() {
    return this.activeStatusListener.asObservable();
  }

  navigateTo(path: string) {
    this.active = path;
    this.activeStatusListener.next(path);
  }
}
