import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare let Peer: any;
@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.less'],
})
export class ReceiverComponent {
  @ViewChild('roomId') roomId: ElementRef;
  @ViewChild('sndMessage') sndMessage: ElementRef;

  peer: any;
  id: string;
  connection;
  messages = [];

  constructor() {
    this.peer = new Peer();
    this.peer.on('open', (_id) => {
      this.id = _id;
      console.log('Id', this.id);
    });
    this.peer.on('connection', (_connection) => {
      _connection.on('open', function () {
        _connection.send('Sender does not accept incoming connections');
        setTimeout(function () {
          _connection.close();
        }, 500);
      });
    });
  }

  join() {
    console.log(this.roomId.nativeElement.value);
    const _roomId = this.roomId.nativeElement.value;
    this.connection = this.peer.connect(_roomId, { reliable: true });
    this.connection.on('open', () => {
      console.log('Connected to ', this.connection.peer);
      this.connection.on('data', (data) => this.messages.push(data));
    });
  }

  sendMessage() {
    const message = this.sndMessage.nativeElement.value;
    this.connection.send({ data: message, user: this.id });
    this.messages.push({ data: message, user: 'Self' });
  }
}
