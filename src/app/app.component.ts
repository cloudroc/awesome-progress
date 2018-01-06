import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'awesome-progress demo';
  percent:any;

  constructor() {
  }

  ngOnInit() {
    this.getP()
  }

  getP(){
    this.percent = 0
  }

  plus(){
    this.percent = this.percent+10;
    if(this.percent>100){
      this.percent = 100
    }
  }

  sub(){
    this.percent = this.percent-10;
    if(this.percent<0){
      this.percent = 0
    }
  }
}
