import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private currentUserSource = new BehaviorSubject<any>({
    IDUser: null,
    usuario: null,
    contraseña: null,
    tipoUsuario: null,
    IDInventario: null
  });
  currentUser = this.currentUserSource.asObservable();

  constructor() { }

  changeCurrentUser(user){
    this.currentUserSource.next(user);
  }
}
