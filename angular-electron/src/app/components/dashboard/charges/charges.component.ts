import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { ProductoxventaService } from 'src/app/services/productoxventa.service';
import { Product } from '../product/product.component';
import { ThemePalette } from '@angular/material/core';
import { lastValueFrom } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'


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
    typeiva: null,
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
    total: null,
    subtotal: null,
    metodo: null,
    IDInventario: null
  };
  productosxventas = null;
  productoxventa = {
    IDProductoXVenta: null,
    IDProducto : null,
    IDVenta: null,
    cantidad: null,
    total: null,
    subtotal: null
  };
  pipe = new DatePipe('en-US');
  // Formulario de Busqueda
  formBuscar: FormGroup
  // Formulario de Venta
  formVenta: FormGroup
  isDisabled: true;
  isTarjeta: false;
  dataSourceCart: any;
  dataSourceSearch: any;
  inputDisabled: true;
  // Formulario Agregar Producto
  formAgregarProd: FormGroup;
  // Table
  productsList: Product[];
  displayedColumns: string[] = ['IDProducto', 'nombre', 'precio', 'cantidad', 'Eliminar'];
  displayedColumnsSearch: string[] = ['IDProducto', 'nombre', 'precio', 'cantidad', 'barras', 'cabys', 'Agregar'];
  // Toggle de Factura
  color: ThemePalette = 'accent';
  disabledFactura = false;
  checkedFactura = false;
  disabledMetodo = false;
  
  

  constructor(private fb: FormBuilder,private fb2: FormBuilder, private fb3: FormBuilder, private productService: ProductoService, private ventaService: VentaService, private productoXVentaService: ProductoxventaService, private _snackBar: MatSnackBar){
    
    this.formBuscar = this.fb.group({
      nameProduct : [''],
      codeProduct : [''],
      units: ['']
    })
    this.formAgregarProd = this.fb3.group({
      nameProduct : [''],
      codeProduct : [''],
      units: ['']
    })
    this.formVenta = this.fb2.group({
      total : [''],
      subtotal : [''],
      discount : ['']
    })
    

  }

  ngOnInit() {}

  async getAllProductos() {
    const data$ = this.productService.getAllProductos(); 
    const data = await lastValueFrom(data$);
    this.products = data;
  }

  async getProducto(IDProducto){
    const data$ = this.productService.getProducto(IDProducto);
    const data = await lastValueFrom(data$);
    this.product = data[0];
  }

  async getProductoBarras(codigoBarra){
    const data$ = this.productService.getProductoBarras(codigoBarra);
    const data = await lastValueFrom(data$);
    this.products = data;
  }

  async getProductoByName(name){
    const data$ = this.productService.getProductoByName(name);
    const data = await lastValueFrom(data$);
    this.products = data;
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

  async getAllProductosXVentas() {
    const data$ = this.productoXVentaService.getAllProductosXVentas(); 
    const data = await lastValueFrom(data$);
    this.productosxventas = data;
  }

  async getAllPXVByIDVenta(IDVenta) {
    const data$ = this.productoXVentaService.getAllPXVByIDVenta(IDVenta); 
    const data = await lastValueFrom(data$);
    this.productosxventas = data;
  }

  async addProductoXVenta(){
    const data$ = this.productoXVentaService.addProductoXVenta(this.productoxventa);
    const data = await lastValueFrom(data$);
  }
  
  async deleteProductoXVenta(IDProductoXVenta){
    const data$ = this.productoXVentaService.deleteProductoXVenta(IDProductoXVenta);
    const data = await lastValueFrom(data$);
  }

  async updateProductoXVenta(){
    const data$ = this.productoXVentaService.updateProductoXVenta(this.productoxventa);
    const data = await lastValueFrom(data$);
  }

  async getProductoXVenta(IDProductoXVenta){
    const data$ = this.productoXVentaService.getProductoXVenta(IDProductoXVenta);
    const data = await lastValueFrom(data$);
    this.productoxventa = data[0];
  }

  updateMetodoPago(event){
    this.isTarjeta = event.checked;
  }

  updateFactura(event){
    this.checkedFactura = event.checked;
  }
  async agregarAlCarrito(element){
    var product_temp = {
      IDProducto: null,
      cantidad: null,
      codigoBarra: null,
      codigoCabys: null,
      iva: null,
      typeiva: null,
      nombre: null,
      precio: null,
      IDVenta: null,
      IDBodega: null
    }

    const quantity = this.formBuscar.value.units;
    if(isNaN(quantity)){
        //Alerta de feedback
        this._snackBar.open("La cantidad debe ser un número",'',{
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
    }
    else{
      product_temp.IDProducto = element.IDProducto;
      product_temp.cantidad = quantity;
      product_temp.codigoBarra = element.codigoBarra;
      product_temp.codigoCabys = element.codigoCabys;
      product_temp.iva = element.iva;
      if(element.iva == '0'){
        product_temp.typeiva = "NO TIENE IVA" 
      } else {
        product_temp.typeiva = "TIENE IVA"
      }
      product_temp.nombre = element.nombre;
      product_temp.precio = element.precio;
  
      this.carrito.push(product_temp);
      this.setElementData();
      this.formBuscar.reset();
    }

  }

  deleteProductCarrito(product : any){
    let tempData: Product[] = [];
    for (let e in this.carrito) {
      if (this.carrito[e].IDProducto != product.IDProducto){
        tempData.push(this.carrito[e]);
      }
    }
    this.carrito = tempData;
    this.setElementData();
  }

  setElementData(){
    var total = 0;
    var subtotal = 0
    var descuento = this.formVenta.value.discount / 100
    let tempData: Product[] = [];

    for (let e in this.carrito) {
      tempData.push(this.carrito[e]);
      subtotal += this.carrito[e].cantidad * this.carrito[e].precio;
    }
    this.dataSourceCart = new MatTableDataSource(tempData);
    total = subtotal - (subtotal * descuento)
    this.formVenta.setValue({
      discount: descuento * 100,
      total: total,
      subtotal: subtotal
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


  createPDF(idVenta: number, productXVenta : any, total : string, subtotal : string, discount : string, payMethod : string){
    var rows = [];
    var _foot = [];
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    var fCompra = 'Fecha de la compra:  ' + currentDate;

    var pTotal = 'Precio total de la compra:  ' + total;
    var dCompra = 'Descuento total de la compra: ' + discount;
    var pMethod = 'Método de pago: ' + payMethod;
    var encabezado = 'Lista de Artículos adquiridos: '
    _foot.push(['','','Subtotal de la compra: ',subtotal])
    _foot.push(['','','Total de la compra: ',total])
    for (var product of productXVenta){
      rows.push([product.IDProducto, product.nombre, product.cantidad, product.precio])
    }

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: [100,250]
    });
    doc.setFont('times');
    doc.setFontSize(20);
    doc.text('Minisúper GyA',30,10);
    doc.setFontSize(8);
    doc.text(fCompra,5,20);
    doc.text(pMethod,5,25);
    doc.text(encabezado,5,30);
    autoTable(doc,{
      theme: 'plain',
      head: [[ 'Ident. de Producto', 'Nombre', 'Cantidad', 'Precio' ]],
      body: rows,
      foot: _foot,
      startY: 35,
      styles: {fontSize: 5, font: 'times'}
    })


    doc.autoPrint();
    doc.save('Facturas/'+ 'VentaID_' + idVenta.toString() + 'Fecha:_'+ currentDate + '.pdf');
    doc.output('dataurlnewwindow');     //opens the data uri in new window
    
  }



  async agregarVenta(){
    this.venta.IDInventario = 2;
    this.venta.cantidad = 0;
    for(var e in this.carrito){
      this.venta.cantidad += parseInt(this.carrito[e].cantidad);
      // Descontamos los productos disponibles del inventario
      await this.getProducto(this.carrito[e].IDProducto);
      this.product.cantidad = this.product.cantidad  - this.carrito[e].cantidad;
      await this.updateProducto();
    }
    this.venta.descuento = this.formVenta.value.discount;
    this.venta.fecha = this.pipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.venta.total = this.formVenta.value.total;
    this.venta.subtotal = this.formVenta.value.subtotal;
    
    if(this.isTarjeta){
      this.venta.metodo = "TARJETA";
    } else {
      this.venta.metodo = "EFECTIVO";
    }
    await this.addVenta();
    await this.getVentaByDate(this.venta.fecha);
     
    for(var e in this.carrito){
      this.productoxventa.IDProducto = this.carrito[e].IDProducto;
      this.productoxventa.IDVenta = this.venta.IDVenta;
      this.productoxventa.cantidad = this.carrito[e].cantidad;
      this.productoxventa.subtotal = this.carrito[e].precio * this.carrito[e].cantidad;
      this.productoxventa.total = (this.carrito[e].precio - this.carrito[e].precio * (this.venta.descuento/100)) * this.carrito[e].cantidad;
      await this.addProductoXVenta();
    }
    await this.getAllPXVByIDVenta(Number(this.venta.IDVenta));
    
    if (this.checkedFactura){
      this.createPDF(Number(this.venta.IDVenta), this.productosxventas, this.venta.total, this.venta.subtotal, this.venta.descuento, this.venta.metodo);
    }
    this.resetPage();
  }

  setProductOnNull(){
    this.product.IDBodega = null;
    this.product.IDProducto = null;
    this.product.IDVenta = null;
    this.product.cantidad = null;
    this.product.codigoBarra = null;
    this.product.codigoCabys = null;
    this.product.iva = null;
    this.product.typeiva = null;
    this.product.nombre = null;
    this.product.precio = null;
  }

  async setElementDataSearch(){
    let tempData: Product[] = [];
    for (let e in this.products) {
      tempData.push(this.products[e]);
    }
    this.dataSourceSearch = new MatTableDataSource(tempData);
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
      if(isNaN(barCode)){
        //Alerta de feedback
        this._snackBar.open("El código de barras debe ser un número",'',{
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
      else{
        await this.getProductoBarras(barCode);
      }
      
    }

    else if (name){
      await this.getProductoByName(name);
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

  

}