import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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

  getAllUsers() {
    this.userService.getAllUsers().subscribe(result => 
      this.users = result);
  }

  addUser(){
    this.userService.addUser(this.user).subscribe(datos =>{
      if(datos['resultado'] === 'OK') {
        alert(datos['mensaje']);
        this.getAllUsers();
      }
      
    });
  }
  
  deleteUser(IDUsuario: number){
    this.userService.deleteUser(IDUsuario).subscribe(datos =>{
      if(datos['resultado'] === 'OK') {
        alert(datos['mensaje']);
        this.getAllUsers();
      }
    });
  }

  updateUser(){
    // console.log("se presiono modificar");
    this.userService.updateUser(this.user).subscribe(datos =>{
      if(datos['resultado'] === 'OK') {
        alert(datos['mensaje']);
        this.getAllUsers();
      }
      
    });
  }

  getUser(IDUsuario){
    this.userService.getUser(IDUsuario).subscribe(datos =>
      this.user = datos[0]);
  }

  ingresar(){
    console.log(this.form);
    const user = this.form.value.user;
    const password = this.form.value.password;
    this.getUser(3);
    console.log(this.user);
    // Get user to login
    if (user == 'mreveiz' && password == '123'){
      this.router.navigate(['dashboard'])
    }
  }

}
