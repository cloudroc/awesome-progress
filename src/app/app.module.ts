import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AwesomeProgressComponent } from './components/awesome-progress/awesome-progress.component';


@NgModule({
  declarations: [
    AppComponent,
    AwesomeProgressComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
