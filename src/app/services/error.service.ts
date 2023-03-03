import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  
  //Registrarse
  codeError(code: String){
    switch(code){
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe'
      
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña no coincide'
      
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'El correo es invalido'

      case FirebaseCodeErrorEnum.WrongPassword:
        return 'La contraseña es incorrecta'

      case FirebaseCodeErrorEnum.UserNotFound:
        return 'El usuario no existe'
      
      default:
        return 'Error'
    }
  }
}
