import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare let Peer: any;
@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.less'],
})
export class SenderComponent {
  @ViewChild('sndMessage') sndMessage: ElementRef;
  peer: any;
  id: string;
  connection;
  messages = [];

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
      this.connection.on('data', (data) => {
        this.messages.push(data);
      });
    });
  }

  sendMessage() {
    const message = this.sndMessage.nativeElement.value;
    this.connection.send({ data: message, user: this.id });
    this.messages.push({ data: message, user: 'Self' });
  }
}
