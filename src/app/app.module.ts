import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { IonicStorageModule } from "@ionic/storage";
import { DocumentViewer } from "@ionic-native/document-viewer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { SafePipe } from "./pipes/safe.pipe";
import { AuthService } from './services/auth.service';

/*
import { File } from '@ionic-native/File/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';*/

@NgModule({
  declarations: [AppComponent, SafePipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DocumentViewer,
    FileOpener
    /*File,
    FileTransfer,
    DocumentViewer,
    */
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
