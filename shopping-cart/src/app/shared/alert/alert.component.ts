import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Output() alertClose = new EventEmitter<void>();
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

  onClose() {
    this.alertClose.emit();
  }
}
