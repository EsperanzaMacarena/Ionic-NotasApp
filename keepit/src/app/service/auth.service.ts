import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { User } from "../models/user-interface";
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: "root"
})
export class AuthService {
  usuario: User = {
    nombre: "",
    email: "",
    photo: ""
  };
  resul: boolean = true;

  constructor(
    public afAuth: AngularFireAuth,
    private usuarioServicio: UserService,
    private googlePlus: GooglePlus
  ) {}

  googleLogin() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
   // return this.googlePlus.login({});
  }

  setLocalData(uid: string, nombre: string, email: string, photo: string) {
    localStorage.setItem("uid", uid);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("email", email);
    localStorage.setItem("photo", photo);
  }

  logout() {
    this.googlePlus.logout().then(resp => {
        localStorage.setItem("uid", "");
        localStorage.setItem("nombre", "");
        localStorage.setItem("email", "");
        localStorage.setItem("photo", "");
        localStorage.setItem("token", "");
      })
      .catch(error => {
        console.log("No se ha podido desconectar.");
      });
  }

  saveUser(resp) {
    this.usuario.nombre = resp.user.displayName;
    this.usuario.email = resp.user.email;
    this.usuario.photo = resp.user.photoURL;
    this.usuarioServicio.createUser(this.usuario);
  }

  isRegisteredUser(email: string) {
    this.usuarioServicio.getUsuario(email).subscribe(resp => {
      if (resp.length == 0) this.resul = false;
      return this.resul;
    });
  }
}
