import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/services/producto.service';
import { Product } from '../product/product.component';
import { ThemePalette } from '@angular/material/core';
import { lastValueFrom } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { VentaService } from 'src/app/services/venta.service';



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
  dataSourceSearch: any;
  dataSourceCart: any;
  inputDisabled: true;
  // Table
  productsList: Product[];
  displayedColumns: string[] = ['IDProducto', 'nombre', 'precio', 'cantidad'];
  displayedColumnsSearch: string[] = ['IDProducto', 'nombre', 'precio', 'cantidad','barras', 'cabys'];
  // Toggle de Factura
  color: ThemePalette = 'accent';
  checkedFactura = false;
  disabledFactura = false;
  // Porductos a mostrar
  products = null;
  product = {
    IDProducto: null,
    cantidad: null,
    codigoBarra: null,
    codigoCabys: null,
    iva: null,
    nombre: null,
    precio: null,
    IDVenta: null,
    IDBodega: null
  };

  constructor(private fb: FormBuilder,private fb2: FormBuilder, private ventaService: VentaService, private _snackBar: MatSnackBar){
    
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



  async buscarBarras(){
    // Obtenemos valores del formularioS
    const name = this.formBuscar.value.nameProduct;
    const barCode = this.formBuscar.value.codeProduct;
    const quantity = this.formBuscar.value.units;
    console.log(name)
    console.log(barCode)
    console.log(quantity)
    // Asignamos valores al objeto producto
    this.product.cantidad = quantity;
    this.product.codigoBarra = barCode;
    this.product.nombre = name;
    this.product.IDVenta = 'NULL';
    // consulta SQL
    await this.getProductoBarras(barCode);
    await this.setElementDataSearch();
    
  }

  async getProductoBarras(codigoBarra){
    const data$ = this.ventaService.getProductoBarras(codigoBarra);
    const data = await lastValueFrom(data$);
    this.products = data;
  }

  async setElementDataSearch(){
    let tempData: Product[] = [];
    for (let e in this.products) {
      tempData.push(this.products[e]);
    }
    console.log(this.products)
    this.dataSourceSearch = new MatTableDataSource(tempData);
    this.formBuscar.reset();
  }

  dummy(){

        //Alerta de feedback
        this._snackBar.open("Busqueda exitosa!",'',{
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
  }
}
