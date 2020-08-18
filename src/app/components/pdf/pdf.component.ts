import { Component, OnInit, Input } from '@angular/core';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { title } from 'process';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
})
export class PdfComponent implements OnInit {

  constructor(
    private previewAnyFile: PreviewAnyFile) { }

  @Input("content") content;

  
  ngOnInit() {
  }

  openPDF() {
    this.previewAnyFile.preview(this.content.url).then(
      (res) => {console.log(res)},
      (err) => alert(JSON.stringify(err))
    );
  }
}
