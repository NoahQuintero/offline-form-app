import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlType, Form } from '../../core/models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  types;

  @Input() form: Form;

  @Output() formSubmitted: EventEmitter<Form> = new EventEmitter<Form>();


  constructor() { }

  ngOnInit() {
    this.types = typeof ControlType;
  }

  submitForm() {
    this.formSubmitted.emit(this.form);
  }

}
