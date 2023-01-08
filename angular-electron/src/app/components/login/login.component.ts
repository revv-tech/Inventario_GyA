import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js'; 
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  currentUser: any;
  userVerified = false;
  users = null;
  user = {
    IDUser: null,
    usuario: null,
    contraseña: null,
    tipoUsuario: null,
    IDInventario: null
  };
  
  key: String;
  form: FormGroup;

  constructor( private fb: FormBuilder, private userService: UserService, private router: Router, private data: DataService, private _snackBar: MatSnackBar){
  
      this.form = this.fb.group({
      user : ['',Validators.required],
      password : ['',Validators.required]

    })

  }

  ngOnInit() : void{
    this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    this.key = "q]a/%E62p7N8P7z#B8H%T2$ywBeL=t";
  }

  async getAllUsers() {
    const data$ = this.userService.getAllUsers(); 
    const data = await lastValueFrom(data$);
    this.users = data;
  }

  async addUser(){
    const data$ = this.userService.addUser(this.user);
    const data = await lastValueFrom(data$);
  }
  
  async deleteUser(IDUsuario: number){
    const data$ = this.userService.deleteUser(IDUsuario);
    const data = await lastValueFrom(data$);
  }

  async updateUser(){
    const data$ = this.userService.updateUser(this.user);
    const data = await lastValueFrom(data$);
  }

  async getUser(IDUsuario){
    const data$ = this.userService.getUser(IDUsuario);
    const data = await lastValueFrom(data$);
    this.user = data[0];
  }

  async getUserByUsername(username){
    const data$ = this.userService.getUserByUsername(username);
    const data = await lastValueFrom(data$);
    this.user = data[0];
  }

  async loginUser(usuario, insertedPassword){
    await this.getUserByUsername(usuario);
    const desPassword = CryptoJS.AES.decrypt(this.user.contraseña.trim(), this.key.trim()).toString(CryptoJS.enc.Utf8);
    if(insertedPassword === desPassword){
      this.userVerified = true;
    } else {

      //Alerta de feedback
      this._snackBar.open("El usuario y la contraseña ingresados no coinciden",'',{
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
      })
      this.userVerified = false;
    }
    return this.user.tipoUsuario;
  }

  async ingresar(){
    const username = this.form.value.user;
    const password = this.form.value.password;
    const type = await this.loginUser(username, password);
    // Get user to login
    if (this.userVerified){
      if(type == "ADMIN"){
        this.router.navigate(['dashboard/board']);
      } else {
        this.router.navigate(['dashboard/board']);
      }
      this.data.changeCurrentUser(this.user);
    }
  }

}
