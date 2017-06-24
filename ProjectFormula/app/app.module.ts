import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import {HttpModule} from "@angular/http";
import { CountdownLocalVarParentComponent, CountdownViewChildParentComponent } from './countdown-parent.component';
import { CountdownTimerComponent } from './countdown-timer.component';


let directives: any[] = [
  AppComponent,
  CountdownTimerComponent
];


// Include Countdown examples
// unless in e2e tests which they break.
if (!/e2e/.test(location.search)) {
  console.log('adding countdown timer examples');
  directives.push(CountdownLocalVarParentComponent);
  directives.push(CountdownViewChildParentComponent);
}


@NgModule({
  imports: [
      HttpModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,directives
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/