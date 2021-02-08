import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

declare let Peer: any;

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.less'],
})
export class GuestComponent implements OnInit {
  peerId: any;

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

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((p) => {
      this.peerId = p.id;
      this.peer = new Peer();
      this.peer.on('open', (_id) => {
        this.id = _id;
        console.log('Id', this.id);
        this.join();
      });
      this.peer.on('connection', (_connection) => {
        _connection.on('open', function () {
          _connection.send('Sender does not accept incoming connections');
          setTimeout(function () {
            _connection.close();
          }, 500);
        });
      });
    });
  }

  join() {
    const _roomId = this.peerId;
    console.log(this.peerId);
    this.connection = this.peer.connect(_roomId, { reliable: true });
    this.connection.on('open', () => {
      console.log('Connected to ', this.connection.peer);
      setInterval(() => {
        // this.connection.send({ ...this.codeFormControl.value, code: 'Guest' });
        // this.codeFormControl.setValue({
        //   ...this.codeFormControl.value,
        //   code: 'Guest',
        // });
        this.connection.send(this.codeFormControl.value);
      }, 200);
      this.isUserConnected = true;
      this.connection.on('data', (value) => {
        console.log('Value Received', value, this.codeFormControl.value);
        if (this.shouldUpdate(value, this.codeFormControl.value)) {
          console.log('Updating');
          this.codeFormControl.setValue(value);
        }
      });
      const x: any = window.navigator;
      var getUserMedia =
        navigator.getUserMedia || x.webkitGetUserMedia || x.mozGetUserMedia;
      this.peer.on('call', (call) => {
        getUserMedia(
          { video: true, audio: true },
          (stream) => {
            call.answer(stream); // Answer the call with an A/V stream.
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
      });
    });
  }

  shouldUpdate(newVal, currVal) {
    if (newVal.code !== currVal.code && newVal.timeStamp > currVal.timeStamp) {
      return true;
    } else {
      return false;
    }
  }

  ngAfterViewInit() {
    // this.codeFormControl.valueChanges.subscribe((code) => {
    //   this.connection.send(code);
    // });
  }
}
