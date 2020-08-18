import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.videoSources  = [
      {
        src: this.youtube_parser(this.url),
        provider: 'youtube',
      },
    ]
  }

  
  @Input("title") title;
  @Input("url") url;
  // get the component instance to have access to plyr instance
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  // or get it from plyrInit event
  player: Plyr;

  videoSources: Plyr.Source[];

  youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  played(event: Plyr.PlyrEvent) {
    
  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }
}
