import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import * as ace from 'ace-builds';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
  ],
})
export class EditorComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;
  value = '';
  aceEditor;

  onChange: any = () => {};
  onTouch: any = () => {};
  tempCode = `// program to check if a number is prime or not

  // take input from the user
  const number = parseInt(prompt("Enter a positive number: "));
  let isPrime = true;
  
  // check if number is equal to 1
  if (number === 1) {
      console.log("1 is neither prime nor composite number.");
  }
  
  // check if number is greater than 1
  else if (number > 1) {
  
      // looping through 2 to number-1
      for (let i = 2; i < number; i++) {
          if (number % i == 0) {
              isPrime = false;
              break;
          }
      }
  
      if (isPrime) {
          console.log("Prime Number");
      } else {
          console.log("Not a prime number");
      }
  }
  
  // check if number is less than 1
  else {
      console.log("The number is not a prime number.");
  }`;

  constructor() {}
  writeValue(obj: any): void {
    this.aceEditor.session.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '18px');
    ace.config.set('showPrintMargin', false);
    ace.config.set('highlightActiveLine', false);
    ace.config.set(
      'basePath',
      'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
    );
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme('ace/theme/twilight');
    this.aceEditor.session.setMode('ace/mode/javascript');
    this.aceEditor.session.setValue(this.tempCode);
    this.aceEditor.on('change', () => {
      this.onChange(this.aceEditor.getValue());
    });
  }
}
