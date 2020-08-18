import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { PlyrComponent } from 'ngx-plyr';

@Component({
  selector: "app-audio",
  templateUrl: "./audio.component.html",
  styleUrls: ["./audio.component.scss"],
})
export class AudioComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.audioSources = [
      {
        src: this.url+ '&date=' + new Date().getTime(),
      }
    ]
  }

  @Input("title") title;
  @Input("url") url;
  // get the component instance to have access to plyr instance
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  // or get it from plyrInit event
  player: Plyr;

  audioSources: Plyr.Source[];

  played(event: Plyr.PlyrEvent) {
    console.log("played", event);
  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }
}
