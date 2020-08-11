import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { IonicStorageModule } from "@ionic/storage";

import { HttpClientModule } from '@angular/common/http';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { MainPipeModule } from './modules/main-pipe/main-pipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import {NgxImageCompressService} from 'ngx-image-compress';
import { Chooser } from '@ionic-native/chooser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    MainPipeModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    SQLitePorter,
    Chooser,
    NgxImageCompressService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PreviewAnyFile
  ],
  bootstrap: [AppComponent],
  exports: [
    
  ]
})
export class AppModule {}
