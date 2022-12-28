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
  ventas = null;
  venta = {
    IDVenta: null,
    fecha: null,
    descuento: null,
    cantidad: null,
    monto: null,
    metodo: null,
    IDInventario: null
  };
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

  constructor(private fb: FormBuilder,private fb2: FormBuilder, private productService: ProductoService, private ventaService: VentaService, private _snackBar: MatSnackBar){
    
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

  async getAllProductos() {
    const data$ = this.productService.getAllProductos(); 
    const data = await lastValueFrom(data$);
    this.products = data;
  }

  async getProductoByID(IDProducto){
    const data$ = this.productService.getProducto(IDProducto);
    const data = await lastValueFrom(data$);
    this.product = data[0];
  }

  async getProductoByName(name){
    const data$ = this.productService.getProductoByName(name);
    const data = await lastValueFrom(data$);
    this.product = data[0];
  }

  async updateProducto(){
    const data$ = this.productService.updateProducto(this.product);
    const data = await lastValueFrom(data$);
  }

  async getAllVentas() {
    const data$ = this.ventaService.getAllVentas(); 
    const data = await lastValueFrom(data$);
    this.ventas = data;
  }

  async addVenta(){
    const data$ = this.ventaService.addVenta(this.venta);
    const data = await lastValueFrom(data$);
  }
  
  async deleteVenta(IDVenta){
    const data$ = this.ventaService.deleteVenta(IDVenta);
    const data = await lastValueFrom(data$);
  }

  async updateVenta(){
    const data$ = this.ventaService.updateVenta(this.venta);
    const data = await lastValueFrom(data$);
  }

  async getVenta(IDVenta){
    const data$ = this.ventaService.getVenta(IDVenta);
    const data = await lastValueFrom(data$);
    this.venta = data[0];
  }

  async getVentaByDate(fecha){
    const data$ = this.ventaService.getVentaByDate(fecha);
    const data = await lastValueFrom(data$);
    this.venta = data[0];
  }
  
  async buscarProducto(){
    const name = this.formBuscar.value.nameProduct;
    const id = this.formBuscar.value.codeProduct;
    if(id){
      await this.getProductoByID(id);
    } else if (name){
      await this.getProductoByName(name);
    }
    console.log(this.product);
    // EL SETVALUE TIRA ERROR
    // this.formBuscar.setValue({
    //   nameProduct: this.product.nombre,
    //   codeProduct: this.product.codigoBarra
    // });
  }

  async agregarAlCarrito(){
    this.product.cantidad = this.formBuscar.value.units;
    this.carrito.push(this.product);
    this.setElementData();
    this.formBuscar.reset();
  }

  setElementData(){
    var total = 0;
    let tempData: Product[] = [];
    for (let e in this.carrito) {
      tempData.push(this.carrito[e]);
      total += this.carrito[e].cantidad * this.carrito[e].precio;
    }
    this.dataSource = new MatTableDataSource(tempData);

    this.formVenta.setValue({
      discount: 0,
      tax: 0.13,
      total: total,
      subtotal: total
    });
  }

  cancelar(){
    this.formBuscar.reset();
  }

  resetPage(){
    this.setProductOnNull();
    this.formBuscar.reset();
    this.formVenta.reset();
    const temparrito: Product[] = [];
    this.carrito = temparrito;
    this.setElementData();
  }

  eliminar(element){
    delete(this.carrito[this.carrito.indexOf(element)]);
    this.setElementData();
  }

  async agregarVenta(){
    this.venta.IDInventario = 2;
    this.venta.cantidad = 0;
    for(var e in this.carrito){
      this.venta.cantidad += this.carrito[e].cantidad;
      // Descontamos los productos disponibles del inventario
      await this.getProductoByID(this.carrito[e].IDProducto);
      this.product.cantidad = this.product.cantidad  - this.carrito[e].cantidad;
      await this.updateProducto();
    }
    this.venta.descuento = this.formVenta.value.discount;
    this.venta.fecha = new Date();
    this.venta.metodo = "EFECTIVO";
    this.venta.monto = this.formVenta.value.total;
    await this.addVenta();
    this.resetPage();
    console.log("VENTA AGREGADA");
  }

  setProductOnNull(){
    this.product.IDBodega = null;
    this.product.IDProducto = null;
    this.product.IDVenta = null;
    this.product.cantidad = null;
    this.product.codigoBarra = null;
    this.product.codigoCabys = null;
    this.product.iva = null;
    this.product.nombre = null;
    this.product.precio = null;
  }

  vender(){}

}
