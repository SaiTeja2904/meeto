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

  codeFormControl: FormControl = new FormControl('');

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
      this.isUserConnected = true;
      this.connection.on('data', (data) => {
        console.log('Value Received');
        this.codeFormControl.setValue(data);
      });
    });
  }

  ngAfterViewInit() {
    // this.codeFormControl.valueChanges.subscribe((code) => {
    //   this.connection.send(code);
    // });
  }
}
