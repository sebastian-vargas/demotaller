import { Component, OnInit, Input } from "@angular/core";
import { ModalController, LoadingController, Platform, AlertController } from "@ionic/angular";
import { NgxImageCompressService } from "ngx-image-compress";
import { ChooserResult } from '@ionic-native/chooser/ngx';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
})
export class AvatarComponent implements OnInit {
  constructor(
    private authS: AuthService,
    public modalCtrl: ModalController,
    private imageCompress: NgxImageCompressService,
    private platform: Platform
  ) {
    
    this.platform.backButton.subscribe(() => {
      this.closeModal();
    });
  }

  ngOnInit() {
    
  }
  loading = true;
  changed = false;
  imgResult: string;
  @Input() file: ChooserResult;
  @Input() token: string;
  croppedImage: string;
  compressedImage: string;
  
  
  ionViewWillLeave() {
  }


  save() {
    console.warn(
      "Size in bytes was:",
      this.imageCompress.byteCount(this.croppedImage)
    );

    this.imageCompress
        .compressFile(this.croppedImage, orientation, 50, 90)
        .then((result) => {
          this.compressedImage = result;
          let blob = this.DataURIToBlob(result);
          this.authS.changeAvatar(this.token, blob).subscribe((res: any) => {
            if(res.status == 200){
              this.authS.loadUser().then(r => {
                this.changed = true;
                this.closeModal();
              });

            }
          })

        });
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  cropperReady() {
    this.loading = false;
    console.log("Ready!");
  }
  imageLoaded(){
    
    console.log('loaded')
  }
  loadImageFailed() {
    // show message
    console.log("Error!");
  }
  

  async closeModal() {
    await this.modalCtrl.dismiss({
      changed: this.changed,
    });
  }
}
