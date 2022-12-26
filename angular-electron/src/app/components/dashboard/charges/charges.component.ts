import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/services/producto.service';
import { Product } from '../product/product.component';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css']
})
export class ChargesComponent {
  // Formulario de Busqueda
  formBuscar: FormGroup
  // Formulario de Venta
  formVenta: FormGroup
  isDisabled: true;
  dataSource: any;
  inputDisabled: true;
  // Table
  productsList: Product[];
  displayedColumns: string[] = ['IDProducto', 'nombre', 'precio', 'cantidad', 'Actions'];
  // Toggle de Factura
  color: ThemePalette = 'accent';
  checkedFactura = false;
  disabledFactura = false;

  constructor(private fb: FormBuilder,private fb2: FormBuilder, private productService: ProductoService, private _snackBar: MatSnackBar){
    
    this.formBuscar = this.fb.group({
      nameProduct : [''],
      codeProduct : [''],
      units: ['']
    })
    this.formVenta = this.fb2.group({
      total : [{value: '', disabled:true}],
      subtotal : [{value: '', disabled:true}],
      tax : [{value: '', disabled:true}],
      discount : [{value: '', disabled:true}]
    })
  }

  ngOnInit() {}
  venta(){}
  buscarProducto(){}

}
