import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css']
})
export class ChargesComponent {

  constructor(private fb: FormBuilder, private productService: ProductoService, private _snackBar: MatSnackBar){
    

  }

}
