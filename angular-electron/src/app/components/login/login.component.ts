import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

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
  
  form: FormGroup

  constructor( private fb: FormBuilder, private userService: UserService, private router: Router){
  
      this.form = this.fb.group({
      user : ['',Validators.required],
      password : ['',Validators.required]

    })

  }

  ngOnInit() : void{
  }

  async getAllUsers() {
    const data$ = this.userService.getAllUsers(); 
    const data = await lastValueFrom(data$);
    this.users = data;
  }

  async addUser(){
    const data$ = this.userService.addUser(this.user);
    const data = await lastValueFrom(data$);
    if (data['resultado'] === 'OK') {
      alert(data['mensaje']);
      this.getAllUsers();
    }
  }
  
  async deleteUser(IDUsuario: number){
    const data$ = this.userService.deleteUser(IDUsuario);
    const data = await lastValueFrom(data$);
    if (data['resultado'] === 'OK') {
      alert(data['mensaje']);
      this.getAllUsers();
    }
  }

  async updateUser(){
    const data$ = this.userService.updateUser(this.user);
    const data = await lastValueFrom(data$);
    if (data['resultado'] === 'OK') {
      alert(data['mensaje']);
      this.getAllUsers();
    }
  }

  async getUser(IDUsuario){
    const data$ = this.userService.getUser(IDUsuario);
    const data = await lastValueFrom(data$);
    this.user = data[0];
  }

  async loginUser(usuario, contraseña){
    const data$ = this.userService.loginUser(usuario, contraseña);
    const data = await lastValueFrom(data$);
    this.user = data[0];
    this.userVerified = true;
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
