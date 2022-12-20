import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost/AngularPHP/';

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get(`${this.url}getAllUsers.php`);
  }

  addUser(user){
    return this.http.post(`${this.url}addUser.php`, JSON.stringify(user));
  }

  deleteUser(idUser:number){
    return this.http.get(`${this.url}deleteUser.php?IDUsuario=${idUser}`);
  }

  getUser(idUser:number){
    return this.http.get(`${this.url}getUser.php?IDUsuario=${idUser}`);
  }

  updateUser(user){
    return this.http.post(`${this.url}updateUser.php`, JSON.stringify(user));
  }
}
