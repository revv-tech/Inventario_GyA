import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { lastValueFrom } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js'; 
import { DataService } from 'src/app/services/data.service';

export interface User {
  IDUser: any;
  user: any;
  password: any;
  userType: any;
  IDInventory: any;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  currentUser: any;
  form: FormGroup
  users = null;
  user =  {
    IDUsuario: null,
    usuario: null,
    contraseña: null,
    tipoUsuario: null,
    IDInventario: null
  };
  displayedColumns: string[] = ['ID Usuario', 'Usuario', 'Tipo de Usuario', 'Actions'];
  dataSource: any;
  isEditar : boolean;
  key: String;

  constructor(private fb: FormBuilder, private userService: UserService, private _snackBar: MatSnackBar, private data: DataService){
    this.form = this.fb.group({
      user : [''],
      password : [''],
      passwordConfirm : [''],
      userType : false,
    })
  }

  ngOnInit() : void{
    this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
    this.key = "q]a/%E62p7N8P7z#B8H%T2$ywBeL=t";
    this.setElementData();
  }

  async getAllUsers() {
    const data$ = this.userService.getAllUsers(); 
    const data = await lastValueFrom(data$);
    this.users = data;
  }

  async getAllUsersExceptMine() {
    const data$ = this.userService.getAllUsersExceptMine(this.currentUser.IDUsuario); 
    const data = await lastValueFrom(data$);
    this.users = data;
  }

  async addUser(){
    const data$ = this.userService.addUser(this.user);
    const data = await lastValueFrom(data$);
  }
  
  async deleteUser(IDUser){
    const data$ = this.userService.deleteUser(IDUser);
    const data = await lastValueFrom(data$);
  }

  async updateUser(){
    const data$ = this.userService.updateUser(this.user);
    const data = await lastValueFrom(data$);
  }

  async getUser(IDUser){
    const data$ = this.userService.getUser(IDUser);
    const data = await lastValueFrom(data$);
    this.user = data[0];
  }

  async setElementData(){
    this.form.reset();
    this.isEditar = false;
    let tempData: User[] = [];
    await this.getAllUsersExceptMine();
    for (let e in this.users) {
      tempData.push(this.users[e]);
    }
    this.dataSource = new MatTableDataSource(tempData);
  }

  async eliminarUsuario(id){
    this.deleteUser(id);
    this.setElementData();
  }

  async agregarUsuario(){
    this.user.IDInventario = 2;
    this.user.IDUsuario = null;
    if(this.form.value.password === this.form.value.passwordConfirm){
      const encPassword = CryptoJS.AES.encrypt( this.form.value.passwordConfirm.trim(), this.key.trim()).toString();
      this.user.contraseña = encPassword;
    }
    if(this.form.value.userType){
      this.user.tipoUsuario = "ADMIN";
    } else {
      this.user.tipoUsuario = "EMPLEADO";
    }
    this.user.usuario = this.form.value.user;
    await this.addUser();
    this.setElementData();
  }

  cargarUsuario(element){
    const desPassword = CryptoJS.AES.decrypt( element.contraseña,  this.key.trim()).toString(CryptoJS.enc.Utf8);
    if(element.tipoUsuario === 'ADMIN'){
      this.form.patchValue({
        password: desPassword,
        user: element.usuario,
        passwordConfirm: desPassword,
        IDInventory: element.IDInventario,
        userType: true
      });
    } else {
      this.form.patchValue({
        password: desPassword,
        user: element.usuario,
        passwordConfirm: desPassword,
        IDInventory: element.IDInventario,
        userType: false
      });
    }
    // Asignamos valores al objeto producto
    this.user.IDInventario = element.IDInventario;
    this.user.contraseña = element.contraseña;
    this.user.IDUsuario = element.IDUsuario;
    this.user.tipoUsuario = element.tipoUsuario;
    this.user.usuario = element.usuario;
    // Habilitamos modo Editar
    this.isEditar = true;
  }

  async editarUsuario(){
    // Obtenemos valores del formularioS
    var usuario = this.form.value.user;
    var contraseña = null;
    if(this.form.value.password === this.form.value.passwordConfirm){
      contraseña = this.form.value.passwordConfirm;
    }
    var tipoUsuario = null;
    if(this.form.value.userType){
      tipoUsuario = "ADMIN";
    } else {
      tipoUsuario = "EMPLEADO";
    }
    const IDInventario = 2;
    // Asignamos valores al objeto producto
    this.user.IDInventario = IDInventario;
    const encPassword = CryptoJS.AES.encrypt(contraseña.trim(), this.key.trim()).toString();
    this.user.contraseña = encPassword;
    this.user.tipoUsuario = tipoUsuario;
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