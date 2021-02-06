import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  codeFormControl: FormControl = new FormControl('');

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
      // this.connection.on('data', (data) => {
      //   this.codeFormControl.setValue(data);
      // });
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.codeFormControl.valueChanges.subscribe((code) => {
      this.connection.send(code);
    });
  }
}
