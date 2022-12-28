import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  form: FormGroup
  users = null;
  user =  {
    IDUser: null,
    user: null,
    password: null,
    userType: null,
    IDInventory: null
  };
  displayedColumns: string[] = ['ID Usuario', 'Usuario', 'Tipo de Usuario', 'Actions'];
  dataSource: any;
  isEditar : boolean;
  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      user : [''],
      password : [''],
      passwordConfirm : [''],
      userType : false,
      IDInventory : ['']
    })
  }

  confirmar(n :any){

  }

  eliminar(user : any){

  }
  cargarUsuario(user : any){

  }
}
