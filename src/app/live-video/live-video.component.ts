import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-live-video',
  templateUrl: './live-video.component.html',
  styleUrls: ['./live-video.component.less'],
})
export class LiveVideoComponent {
  @Input() showControls;
  @Input('stream') videoStream: MediaStream;
  @ViewChild('liveVideo') liveVideo: ElementRef;
  camera: boolean;
  voice: boolean;
  videoLoaded = false;

  constructor() {}

  ngOnChanges(): void {
    if (this.videoStream) {
      this.videoLoaded = true;
      this.camera = true;
      this.voice = true;
      const liveVideoElement = this.liveVideo.nativeElement;
      liveVideoElement.srcObject = this.videoStream;
      liveVideoElement.onloadedmetadata = (e: any) => {
        liveVideoElement.play();
      };
    }
  }

  onOffCamera() {
    let enabled = this.videoStream.getVideoTracks()[0].enabled;
    if (enabled) {
      this.videoStream.getVideoTracks()[0].enabled = false;
      this.camera = false;
    } else {
      this.videoStream.getVideoTracks()[0].enabled = true;
      this.camera = true;
    }
  }

  muteUnmuteAudio() {
    const enabled = this.videoStream.getAudioTracks()[0].enabled;
    if (enabled) {
      this.videoStream.getAudioTracks()[0].enabled = false;
      this.voice = false;
    } else {
      this.videoStream.getAudioTracks()[0].enabled = true;
      this.voice = true;
    }
  }
}
