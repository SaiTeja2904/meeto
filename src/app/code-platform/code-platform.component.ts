import { Component, forwardRef, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CodePlatformService } from './code-platform.service';

@Component({
  selector: 'app-code-platform',
  templateUrl: './code-platform.component.html',
  styleUrls: ['./code-platform.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodePlatformComponent),
      multi: true,
    },
  ],
})
export class CodePlatformComponent implements OnInit, ControlValueAccessor {
  codeEditor: FormControl = new FormControl('');
  output;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(private codePlatformService: CodePlatformService) {}

  writeValue(obj: any): void {
    this.codeEditor.setValue(obj);
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

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.codeEditor.valueChanges.subscribe((val) => {
      this.onChange(val);
    });
  }

  execute() {
    this.codePlatformService
      .execute(this.codeEditor.value.code)
      .subscribe((out) => {
        this.output = out.response;
      });
  }
}
