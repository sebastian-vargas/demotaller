import { Component, OnInit, Input, ViewChild } from "@angular/core";

import { Howl, Howler } from "howler";
import { IonRange } from "@ionic/angular";

@Component({
  selector: "app-audio-player",
  templateUrl: "./audio-player.component.html",
  styleUrls: ["./audio-player.component.scss"],
})
export class AudioPlayerComponent implements OnInit {
  constructor() {}

  @Input("title") title = "Audio";
  @Input("url") url = "";

  @ViewChild("range") range: IonRange;

  playing = false;
  loading = false;
  error = false;
  duration = 0;
  _seek = 0;
  interval: any;

  firstPlay = true;
  id = null;

  player = null;

  ngOnInit() {
    this.player = new Howl({
      usingWebAudio: true,
      format: [
        "audio/mpeg"
      ],
      src: [this.url],
      html5: true,
      onload: () => {
        this.duration = this.player.duration();
        this.range.max = this.player.duration();
        this.player.stop(this.id);
      },
      onloaderror: (id, error) => {
        console.log(error)
        this.error = true;  
        this.title = "Audio no disponible.";   
      },
      onplay: () => {
        this.firstPlay = false;
        this.loading = false;
        this.playing = true;
        clearInterval(this.interval);
        this.interval = setInterval(() => this.updateProgress(), 1000);
      },
      onpause: () => {
        this.playing = false;
        clearInterval(this.interval);
      },
      onend: () => {
        this.playing = false;
        this.updateProgress();
        clearInterval(this.interval);
      },
      onseek: () => {
        this.updateProgress();
        this.player.play(this.id);
      },
    });
  }

  togglePlayer() {
    if (this.firstPlay) {
      if (this.player.state() === "loaded") {
        this.loading = true;
        this.id = this.player.play();
        this.range.disabled = false;
      }
    } else {
      if (!this.player.playing(this.id) && this.player.state() === "loaded") {
        this.loading = true;
        this.player.play(this.id);
      } else {
        this.player.pause(this.id);
      }
    }
  }

  updateProgress() {
    this.range.value = this.player.seek(null, this.id);
    this._seek = Math.round(this.player.seek(null, this.id));
  }

  seek() {
    this.loading = true;

    if (this.player.playing()) {
      this.player.pause(this.id);
    }
    setTimeout(() => this.player.seek(this.range.value, this.id), 300);
  }
}
