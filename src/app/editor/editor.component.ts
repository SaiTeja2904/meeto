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
  aceEditor;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() {}

  writeValue(obj: any): void {
    console.log('Setting', obj);
    if (this.aceEditor) {
      this.aceEditor.session.setValue(obj.code);
    }
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
    // this.aceEditor.session.setValue(this.tempCode);
    this.aceEditor.on('change', (e) => {
      // const { action } = e;
      // if (action !== 'remove') {
      //   this.onChange({
      //     code: this.aceEditor.getValue(),
      //     timeStamp: Date.now(),
      //   });
      // }
      this.onChange({
        code: this.aceEditor.getValue(),
        timeStamp: Date.now(),
        change: e,
      });
    });
  }
}
