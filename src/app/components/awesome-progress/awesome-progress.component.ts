import { Component, Input } from '@angular/core';

@Component({
  selector: 'awesome-progress'
  , template: `
  <div class="awesome-progress awesome-progress--line" *ngIf="type == 'line'">
    <div class="awesome-progress-bar" [ngStyle]="calBarStyle()">
      <div class="awesome-progress-bar__outer" 
          [ngStyle]="outerBarStyle()"
          >
        <div class="awesome-progress-bar__inner" 
          [ngStyle]="innerBarStyle()">
          <div *ngIf="isTextInside == 'true'" class="awesome-progress-bar__innerText" [ngStyle]="{ fontSize: progressTextSize + 'px' }">{{text}}</div>
        </div>
      </div>
    </div>

    <div *ngIf="isTextInside == 'false'" class="awesome-progress__text" [ngStyle]="{ fontSize: progressTextSize + 'px' }">{{text}}</div>

  </div>
  
  <div class="awesome-progress awesome-progress--circle" *ngIf="type == 'circle'">
    <div class="awesome-progress-circle" [style.height]="width+'px'" [style.width]="width+'px'">
      <svg viewBox="0 0 100 100">
        <path
          fill="none"
          [attr.d]="trackPath()"
          [style.stroke]="trackColor"
          [style.stroke-width]="relativeStrokeWidth" 
          class="awesome-progress-circle__track">
        </path>
        <path
          fill="none" 
          [attr.d]="trackPath()"
          [style.stroke]="strokeColor"
          [style.stroke-linecap]="rounded=='true' ? 'round' : ''"
          [style.stroke-width]="relativeStrokeWidth"
          class="awesome-progress-circle__path" 
          [ngStyle]="circlePathStyle()">
        </path>
      </svg>
    </div>
    <div class="awesome-progress__text" 
      [ngStyle]="{ fontSize: progressTextSize + 'px' }"
      >{{text}}</div>
  </div>
  `
  , styles: [
    `.awesome-progress{
    position: relative;
    line-height: 1;
  }
  .awesome-progress--circle {
      display: inline-block;
  }
  .awesome-progress--circle .awesome-progress__text {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      margin: 0;
      text-align: center;
      transform: translate(0, -50%);
  }
  .awesome-progress__text {
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
      font-size: 14px;
      color: #48576a;
      line-height: 1;
  }

  .awesome-progress-bar {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    box-sizing: border-box;
  }
  .awesome-progress-bar__outer {
      position: relative;
      vertical-align: middle;
      overflow: hidden;
  }
  .awesome-progress-bar__inner {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      line-height: 1;
      text-align: right;
      width:0%
  }
  .awesome-progress-bar__innerText {
      display: inline-block;
      vertical-align: middle;
      color: #fff;
      font-size: 12px;
      margin: 0 5px;
      white-space: nowrap;
  }
  `
  ]
  , providers: []
})
export class AwesomeProgressComponent {

  constructor() { }

  get progressTextSize(): number {
    if (this.textSize > 0) {
      return this.textSize
    } else {
      return this.type == 'line' ? this.strokeWidth * .8 : this.width * 0.111111 + 2
    }
  }

  calBarStyle() {
    let style: any = {}
    if (this.isTextInside == "false") {
      style.paddingRight = "25%"
      style.marginRight = "-25%"
    }
    return style
  }

  outerBarStyle() {
    let style: any = {}
    style.height = this.strokeWidth + 'px'
    style.backgroundColor = this.trackColor
    if (this.rounded == "true") {
      style.borderRadius = "10px"
    }
    return style
  }

  innerBarStyle() {
    let style: any = {}
    style.width = this.percentage + '%'
    style.backgroundColor = this.strokeColor
    style.lineHeight = this.strokeWidth + 'px'
    if (this.rounded == "true") {
      style.borderRadius = "10px"
    }
    style.webkitTransition = this.duration + 's'
    return style
  }

  trackPath(): string {
    let radius = 50 - this.relativeStrokeWidth / 2;
    let reverse = 0
    if (this.reverse == "true") {
      reverse = 1
    }
    return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 ${reverse} 0 ${radius * 2} a ${radius} ${radius} 0 1 ${reverse} 0 -${radius * 2}`
  }

  get relativeStrokeWidth(): number {
    return (this.strokeWidth / this.width * 100)
  }

  get perimeter(): number {
    let radius = 50 - this.relativeStrokeWidth / 2
    return 2 * Math.PI * radius
  }

  circlePathStyle() {
    let perimeter = this.perimeter;
    let duration = this.duration;
    return {
      strokeDasharray: `${perimeter}px,${perimeter}px`,
      strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
      transition: `stroke-dashoffset ${duration}s ease 0s, stroke ${duration}s ease`
    }
  }

  @Input() type: string;//圆形还是直线
  @Input() width: number = 126;//圆形的默认宽度，单位 px
  @Input() reverse: string = "false";//是否逆时针方向
  @Input() strokeWidth: number = 6;//进度条的宽度，单位 px
  @Input() rounded: string = "false";//进度条顶端的形状（只在 type=circle 时可用）
  @Input() strokeColor: string = "#20a0ff";//stroke的颜色
  @Input() trackColor: string = "#e5e9f2";//track的颜色
  @Input() percentage: number = 0;//百分比 必须小于100
  @Input() text: string = "";//显示的文本
  @Input() textSize: number = 0;//文本字体，不设置会自动计算一个字体大小
  @Input() isTextInside: string = "true";//直线进度条的文字是否在内部显示
  @Input() duration: number = 0.6;//动画持续时间

}
