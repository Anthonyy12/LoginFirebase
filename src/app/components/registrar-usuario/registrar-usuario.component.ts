import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  registrarUsuario: FormGroup;
  loading: boolean = false;
  
  constructor(
    private fb: FormBuilder, 
    private afAuth: AngularFireAuth, 
    private toastr: ToastrService, 
    private router: Router,
    private firebaseError: ErrorService
    ){
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
    })
  }

  ngOnInit():void{
  }

  registrar(){
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repeatPassword = this.registrarUsuario.value.repeatPassword;

    if(password !== repeatPassword){
      this.toastr.error('Las contraseñas no coinciden', 'Error')
      return;
    }

    this.loading = true;
    
    this.afAuth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      this.loading = false;
      
      this.verificarCorreo();
    })
    .catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }
  
  verificarCorreo(){
    this.afAuth.currentUser
    .then(user => user?.sendEmailVerification())
    .then(()=>{
          this.toastr.info('Se envio un correo de verificacion de su cuenta', 'Verifique su correo');
          this.router.navigate(['/login']);
    })
  }

}
