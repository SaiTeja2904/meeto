import { Component, OnInit } from '@angular/core';
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
        this.connection.send(this.codeFormControl.value);
      }, 100);
      this.isUserConnected = true;
      this.connection.on('data', (value) => {
        // console.log('Value Received', value, this.codeFormControl.value);
        if (this.shouldUpdate(value, this.codeFormControl.value)) {
          // console.log('Updating');
          this.codeFormControl.setValue(value);
        }
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
