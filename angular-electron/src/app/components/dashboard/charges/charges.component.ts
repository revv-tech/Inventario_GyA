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
  displayedColumnsSearch: string[] = ['IDProducto', 'nombre', 'precio', 'cantidad','barras', 'cabys', 'Agregar'];
  // Toggle de Factura
  color: ThemePalette = 'accent';
  checkedFactura = false;
  disabledFactura = false;
  // Porductos a mostrar
  products = null;
  cart = [];
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
  agregarProductoCarrito(element){
    // Creamos un objeto producto temporal
    var product_temp = {
      IDProducto: null,
      cantidad: null,
      codigoBarra: null,
      codigoCabys: null,
      iva: null,
      nombre: null,
      precio: null,
      IDVenta: null,
      IDBodega: null
    }

    const quantity = this.formBuscar.value.units;
    product_temp.IDProducto = element.IDProducto;
    product_temp.cantidad = quantity;
    product_temp.codigoBarra = element.codigoBarra;
    product_temp.codigoCabys = element.codigoCabys;
    product_temp.iva = element.iva;
    product_temp.nombre = element.nombre;
    product_temp.precio = element.precio;

    this.cart.push(product_temp)
    
    
    this.dataSourceCart = new MatTableDataSource(this.cart);
    this.formBuscar.reset();
  }


  async buscarProducto(){
    // Obtenemos valores del formularioS
    const name = this.formBuscar.value.nameProduct;
    const barCode = this.formBuscar.value.codeProduct;
    const quantity = this.formBuscar.value.units;
    // Asignamos valores al objeto producto
    this.product.cantidad = quantity;
    this.product.codigoBarra = barCode;
    this.product.nombre = name;
    this.product.IDVenta = 'NULL';
    // consulta SQL

    if (barCode){
      await this.getProductoBarras(barCode);    
    }
    
    else if (name){
      await this.getProductoNombre(name);
    }
    else{
        //Alerta de feedback
        this._snackBar.open("Debe insertar dato de búsqueda",'',{
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })      
    }
    await this.setElementDataSearch();
  }

  async getProductoBarras(codigoBarra){
    const data$ = this.ventaService.getProductoBarras(codigoBarra);
    const data = await lastValueFrom(data$);
    this.products = data;
  }

  async getProductoNombre(nombre){
    
    const data$ = this.ventaService.getProductoNombre(nombre);
    const data = await lastValueFrom(data$);
    this.products = data;
  }

  async setElementDataSearch(){
    let tempData: Product[] = [];
    for (let e in this.products) {
      tempData.push(this.products[e]);
    }
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
