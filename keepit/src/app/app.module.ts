import { NotesShareComponent } from './notes-share/notes-share.component';
import { AuthService } from './service/auth.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoginComponent } from './login/login.component';
import { NotesService } from './service/notes.service';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { NotesCreateComponents } from './notes-create/notes-create.component';
import { CategoriesNewComponent } from './categories-new/categories-new.component';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    NotesCreateComponents,
    CategoriesNewComponent,
    LoginComponent,
    NotesShareComponent
  ],
  entryComponents: [
    NotesCreateComponents,
    CategoriesNewComponent,
    NotesShareComponent
  ],
  imports: [
    FormsModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), //IMPORTAMOS EL CONST CONFIG DE FIREBASE
    AngularFirestoreModule, // firestore
    AngularFireStorageModule, // storage
    AngularFireAuthModule
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    NotesService,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
