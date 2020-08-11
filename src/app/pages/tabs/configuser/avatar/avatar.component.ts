import { Component, OnInit, Input } from "@angular/core";
import { ModalController, LoadingController, Platform } from "@ionic/angular";
import { NgxImageCompressService } from "ngx-image-compress";
import { ChooserResult } from '@ionic-native/chooser/ngx';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: "app-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
})
export class AvatarComponent implements OnInit {
  constructor(
    public modalCtrl: ModalController,
    private imageCompress: NgxImageCompressService,
    public loadingController: LoadingController,
    private platform: Platform
  ) {
    this.platform.backButton.subscribe(() => {
      this.closeModal();
    });
  }

  ngOnInit() {
    
  }

  changed = false;
  imgResult: string;
  @Input() file: ChooserResult;
  loading = null;
  croppedImage: string;
  compressedImage: string;
  
  
  ionViewWillLeave() {
    if (this.loading != null) this.loading.dismiss();
  }


  save() {
    console.warn(
      "Size in bytes was:",
      this.imageCompress.byteCount(this.croppedImage)
    );

    this.imageCompress
        .compressFile(this.croppedImage, orientation, 50, 80)
        .then((result) => {
          this.compressedImage = result;
          let blob = this.DataURIToBlob(result);
          console.log(blob);
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
    if (this.loading != null) {
      
      console.log(this.loading)
      this.loading.dismiss();
    }
    console.log("Ready!");
  }
  imageLoaded(){
    console.log('loaded')
  }
  loadImageFailed() {
    // show message
    console.log("Error!");
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log("Loading dismissed!");
  }
  
  async closeModal() {
    await this.modalCtrl.dismiss({
      changed: this.changed,
    });
  }
}
