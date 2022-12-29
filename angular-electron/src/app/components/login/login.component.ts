import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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

  constructor( private fb: FormBuilder, private userService: UserService, private router: Router){
  
      this.form = this.fb.group({
      user : ['',Validators.required],
      password : ['',Validators.required]

    })

  }

  ngOnInit() : void{
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
    console.log(this.user);
    const desPassword = CryptoJS.AES.decrypt(this.user.contraseña.trim(), this.key.trim()).toString(CryptoJS.enc.Utf8);
    console.log(insertedPassword);
    console.log(desPassword);
    if(insertedPassword === desPassword){
      this.userVerified = true;
    } else {
      this.userVerified = false;
    }
  }

  async ingresar(){
    const username = this.form.value.user;
    const password = this.form.value.password;
    await this.loginUser(username, password);
    // Get user to login
    if (this.userVerified){
      this.router.navigate(['dashboard'])
    }
  }

}
