import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  constructor(
    private authService: AuthService,
    private usuarioServicio :UserService,
    private router: Router) { }

  ngOnInit() { }

  googleSignIn() {
    this.authService.googleLogin().then(resp => {
      console.log(resp);
      this.authService.setLocalData(
        resp.user.uid,
        resp.user.displayName,
        resp.user.email,
        resp.user.photoURL
      );
      this.usuarioServicio.getUsuario(resp.user.email).subscribe(resp2 => {
        if (resp2.length == 0) {
          this.authService.saveUser(resp);
        } 
      });
       this.router.navigate(['app/tabs/tab1']);

    });
  }

}
