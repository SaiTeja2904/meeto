import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

declare let Peer: any;

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.less'],
})
export class HostComponent implements OnInit {
  peer: any;
  id: string;
  connection;
  messages = [];
  isUserConnected = false;

  codeFormControl: FormControl = new FormControl({
    code: '',
    timeStamp: Date.now(),
  });

  constructor() {
    this.peer = new Peer();
    this.peer.on('open', (_id) => {
      this.id = _id;
      console.log('Id:', this.id);
    });
    this.peer.on('connection', (_connection) => {
      if (this.connection && this.connection.open) {
        _connection.on('open', function () {
          _connection.send('Already connected to another client');
          setTimeout(function () {
            _connection.close();
          }, 500);
        });
        return;
      }
      this.connection = _connection;
      console.log('Connected to ' + _connection.peer);
      this.isUserConnected = true;
      setInterval(() => {
        // this.connection.send({ ...this.codeFormControl.value, code: 'Host' });
        // this.codeFormControl.setValue({
        //   ...this.codeFormControl.value,
        //   code: 'Host',
        // });
        this.connection.send(this.codeFormControl.value);
      }, 100);
      this.connection.on('data', (value) => {
        console.log('Value Received', value, this.codeFormControl.value);
        if (this.shouldUpdate(value, this.codeFormControl.value)) {
          console.log('Updating');
          this.codeFormControl.setValue(value);
        }
      });
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // this.codeFormControl.valueChanges
    //   .pipe(debounce(() => interval(100)))
    //   .subscribe((value) => {
    //     this.connection.send(value);
    //   });
  }

  shouldUpdate(newVal, currVal) {
    if (newVal.code !== currVal.code && newVal.timeStamp > currVal.timeStamp) {
      return true;
    } else {
      return false;
    }
  }
}
