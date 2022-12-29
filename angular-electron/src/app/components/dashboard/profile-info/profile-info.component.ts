import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent {
  form: FormGroup;
  user = {
    IDUser: null,
    usuario: null,
    contraseña: null,
    tipoUsuario: null,
    IDInventario: null
  };
  constructor(private fb: FormBuilder, private userService: UserService){
    this.form = this.fb.group({
      user : ['',Validators.required],
      password : ['',Validators.required],
      confirmedPassword: ['',Validators.required],
      userType: false,
      IDInventory: ['',Validators.required]
    })
  }

  editar(){}
}
