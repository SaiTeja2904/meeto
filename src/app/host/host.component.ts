import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('hostVideo') hostVideo: ElementRef;
  @ViewChild('guestVideo') guestVideo: ElementRef;

  constructor() {}

  private receiveMessages() {
    this.connection.on('data', (value) => {
      if (this.shouldUpdate(value, this.codeFormControl.value)) {
        console.log('Value Received', value, this.codeFormControl.value);
        console.log('Updating');
        this.codeFormControl.setValue(value);
      }
    });
  }

  private sendMessages() {
    setInterval(() => {
      // this.connection.send({ ...this.codeFormControl.value, code: 'Host' });
      // this.codeFormControl.setValue({
      //   ...this.codeFormControl.value,
      //   code: 'Host',
      // });
      this.connection.send(this.codeFormControl.value);
    }, 100);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
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
      this.startVideoStream(_connection);
      this.sendMessages();
      this.receiveMessages();
    });
  }

  private startVideoStream(_connection: any) {
    const x: any = navigator;
    var getUserMedia =
      x.getUserMedia || x.webkitGetUserMedia || x.mozGetUserMedia;
    getUserMedia(
      { video: true, audio: false },
      (stream) => {
        var call = this.peer.call(_connection.peer, stream);
        call.on('stream', (remoteStream) => {
          const hostVideoElement = this.hostVideo.nativeElement;
          hostVideoElement.srcObject = stream;
          hostVideoElement.onloadedmetadata = (e: any) => {
            hostVideoElement.play();
          };

          const guestVideoElement = this.guestVideo.nativeElement;
          guestVideoElement.srcObject = remoteStream;
          guestVideoElement.onloadedmetadata = (e: any) => {
            guestVideoElement.play();
          };
        });
      },
      (err) => {
        console.log('Failed to get local stream', err);
      }
    );
  }

  shouldUpdate(newVal, currVal) {
    if (newVal.code !== currVal.code && newVal.timeStamp > currVal.timeStamp) {
      return true;
    } else {
      return false;
    }
  }
}
