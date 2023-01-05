import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { DataService } from 'src/app/services/data.service';
import * as CryptoJS from 'crypto-js';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {
  key: String;
  currentUser: any;
  form: FormGroup;
  user = {
    IDUsuario: null,
    usuario: null,
    contraseña: null,
    tipoUsuario: null,
    IDInventario: null
  };
  constructor(private fb: FormBuilder, private userService: UserService, private data: DataService, private _snackBar: MatSnackBar){
    this.form = this.fb.group({
      user : ['',Validators.required],
      password : ['',Validators.required],
      confirmedPassword: ['',Validators.required],
      userType: false,
      IDInventory: ['',Validators.required]
    })
  }
  
  ngOnInit() : void{
    this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    this.key = "q]a/%E62p7N8P7z#B8H%T2$ywBeL=t";
    this.setElementData();
  }

  setElementData(){
    const desPassword = CryptoJS.AES.decrypt( this.currentUser.contraseña.trim(),  this.key.trim()).toString(CryptoJS.enc.Utf8);
    this.form.patchValue({
      password: desPassword,
      user: this.currentUser.usuario,
      confirmedPassword: desPassword,
      IDInventory: this.currentUser.IDInventario
    });
  }

  async updateUser(){
    const data$ = this.userService.updateUser(this.user);
    const data = await lastValueFrom(data$);
  }

  async editar(){
    // Obtenemos valores del formularioS
    var usuario = this.form.value.user;
    usuario = String(usuario).toLowerCase();
    var contraseña = null;
    if(this.form.value.password === this.form.value.confirmedPassword){
      contraseña = this.form.value.confirmedPassword;
    }
    const IDInventario = this.form.value.IDInventory;
    // Asignamos valores al objeto producto
    this.user.IDUsuario = this.currentUser.IDUsuario;
    this.user.IDInventario = IDInventario;
    const encPassword = CryptoJS.AES.encrypt(contraseña.trim(), this.key.trim()).toString();
    this.user.contraseña = encPassword;
    this.user.tipoUsuario = this.currentUser.tipoUsuario;
    this.user.usuario = usuario;
    // consulta SQL
    await this.updateUser();
    await this.setElementData();
    this._snackBar.open("El usuario fue editado con éxito!",'',{
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
