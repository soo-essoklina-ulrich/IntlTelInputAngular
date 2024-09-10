import {
  AfterViewInit,
  Component,
  EventEmitter, Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import intlTelInput from 'intl-tel-input';


declare var intlTelInputUtils: { numberFormat: { E164: any; }; };

@Component({
  selector: 'app-formintel',
  templateUrl: './formintel.component.html',
  styleUrl: './formintel.component.css'
})
export class FormintelComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('telInput') telInput: any;
  @Input() phoneNumber = '';
  @Input() cssClass = 'form-control';
  @Output() phoneNumberChange = new EventEmitter<string>();
  iti:any;
  isInvalid = false;
  selectedCountryCode: any;
  form! : FormGroup;


  constructor(
    private fb : FormBuilder
  ) { }


  ngOnInit(): void {
    this.createForm();

    this.formatIntlTelInput();
    this.phoneNumberChange.emit(this.phoneNumber);
  }
  ngAfterViewInit(): void {
    // const input = document.querySelector("#" + this.inputId);
    this.iti = intlTelInput(this.telInput.nativeElement, {
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.4.0/build/js/utils.js",
      // initialCountry: "auto",
      nationalMode: false,
      formatOnDisplay: true
    });
    this.selectedCountryCode = this.iti.getSelectedCountryData().dialCode;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formatIntlTelInput();
    this.phoneNumberChange.emit(this.phoneNumber);
  }

  ngOnDestroy(): void {
    this.iti.destroy();
  }
  createForm(){
    this.form = this.fb.group({
     'tel': ['']
    });
  }


  Formsubmit(){
    console.log(this.form.value);
  }

  onFocus = () =>{
    if(this.phoneNumber == undefined || this.phoneNumber == ""){
      var getCode = this.iti.getSelectedCountryData().dialCode;
      this.phoneNumber = "+" + getCode;
    }
  }

  onBlur = ()=>{
    this.isInvalid = false;
    if(this.phoneNumber != undefined && this.phoneNumber.trim()){
      if(this.iti.isValidNumber()){
        this.isInvalid = false;
      }
      else{
        this.isInvalid = true;
      }
    }
  }

  onInputKeyPress = (event: KeyboardEvent) =>{
    const allowedChars = /[0-9\+\-\ ]/;
    const allowedCtrlChars = /[axcv]/; // Allows copy-pasting
    const allowedOtherKeys = [
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'Home',
      'End',
      'Insert',
      'Delete',
      'Backspace',
    ];

    if (
      !allowedChars.test(event.key) &&
      !(event.ctrlKey && allowedCtrlChars.test(event.key)) &&
      !allowedOtherKeys.includes(event.key)
    ) {
      event.preventDefault();
    }
  }

  formatIntlTelInput() {
    if (typeof intlTelInputUtils !== 'undefined') { // utils are lazy loaded, so must check
      var currentText = this.iti.getNumber(intlTelInputUtils.numberFormat.E164);
      if (typeof currentText === 'string') { // sometimes the currentText is an object :)
        this.iti.setNumber(currentText); // will autoformat because of formatOnDisplay=true
      }
    }
  }

  onPhoneNumberChange = () =>{
    this.selectedCountryCode = this.iti.getSelectedCountryData().dialCode;
    // this.formatIntlTelInput();
    this.phoneNumberChange.emit(this.phoneNumber);
  }




}
