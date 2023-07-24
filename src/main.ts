import 'zone.js/dist/zone';
import { Subject } from 'rxjs/Subject';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'hehe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 (click)="sayMessage()">Hello from {{name}}!</h1>
    <p>This is my first component!{{msg}}</p>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular,and more
      <br/>whate is your <b>name</b>? 
    </a>
    <br/>
    <div *ngIf="condition; then thenBlock else elseBlock"></div>
    <ng-template #thenBlock>Content to render when condition is true.</ng-template>
    <ng-template #elseBlock>Content to render when condition is false.</ng-template><br/>

    <button (click)="nextUser()">Next User</button>
    <br>
    <div *ngIf="userObservable | async as user; else loading">
      Hello {{user.last}}, {{user.first}}!
    </div>
    <ng-template #loading let-user>Waiting... (user is {{user|json}})</ng-template>
  `,
})
export class App {
  name = 'Angular';
  msg = 'test var';
  condition = false;
  sayMessage() {
    alert(this.msg);
  }

  userObservable = new Subject<{ first: string; last: string }>();
  first = ['John', 'Mike', 'Mary', 'Bob'];
  firstIndex = 0;
  last = ['Smith', 'Novotny', 'Angular'];
  lastIndex = 0;

  nextUser() {
    let first = this.first[this.firstIndex++];
    if (this.firstIndex >= this.first.length) this.firstIndex = 0;
    let last = this.last[this.lastIndex++];
    if (this.lastIndex >= this.last.length) this.lastIndex = 0;
    this.userObservable.next({ first, last });
  }
}

bootstrapApplication(App);
