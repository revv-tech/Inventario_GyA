import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { Product } from '../product/product.component';
import { ThemePalette } from '@angular/material/core';
import { lastValueFrom } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css']
})
export class ChargesComponent {
  carrito: Product[] = [];
  
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

  async getVentaByDate(fecha){
    const data$ = this.ventaService.getVentaByDate(fecha);
    const data = await lastValueFrom(data$);
    this.venta = data[0];
  }

  async getVenta(IDVenta){
    const data$ = this.ventaService.getVenta(IDVenta);
    const data = await lastValueFrom(data$);
    this.venta = data[0];
  }
    
  async updateVenta(){
    const data$ = this.ventaService.updateVenta(this.venta);
    const data = await lastValueFrom(data$);
    
  }

  async deleteVenta(IDVenta){
    const data$ = this.ventaService.deleteVenta(IDVenta);
    const data = await lastValueFrom(data$);

  }
  async addVenta(){
    const data$ = this.ventaService.addVenta(this.venta);
    const data = await lastValueFrom(data$);
  }
  
  /*
  async getAllVentas() {
    const data$ = this.ventaService.getAllVentas(); 
    this.ventas = data;
    const data = await lastValueFrom(data$);
  }
  */

  /*
  async updateProducto(){
    const data$ = this.productService.updateProducto(this.product);
    const data = await lastValueFrom(data$);
  }

  async getProductoByID(IDProducto){
    const data$ = this.productService.getProducto(IDProducto);
    const data = await lastValueFrom(data$);
    this.product = data[0];
  }
  */

  async buscarProducto(){
    // Obtenemos valores del formularioS
    const name = this.formBuscar.value.nameProduct;
    const barCode = this.formBuscar.value.codeProduct;
    this.product.cantidad = quantity;
    // Asignamos valores al objeto producto
    const quantity = this.formBuscar.value.units;
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
  }
    this.products = data;
    const data = await lastValueFrom(data$);
    const data$ = this.ventaService.getProductoBarras(codigoBarra);
  async getProductoBarras(codigoBarra){

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
