import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { ProductoxventaService } from 'src/app/services/productoxventa.service';
import { Product } from '../product/product.component';
import { ThemePalette } from '@angular/material/core';
import { lastValueFrom } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ThisReceiver } from '@angular/compiler';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


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
  productosxventas = null;
  productoxventa = {
    IDProductoXVenta: null,
    IDProducto : null,
    IDVenta: null,
    cantidad: null
  };
  // Formulario de Busqueda
  formBuscar: FormGroup
  // Formulario de Venta
  formVenta: FormGroup
  isDisabled: true;
  isEfectivo: false;
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
    this.isEfectivo = event.checked;
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

    this.carrito.push(product_temp);
    this.setElementData();
    this.formBuscar.reset();
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
    let tempData: Product[] = [];
    for (let e in this.carrito) {
      tempData.push(this.carrito[e]);
      total += this.carrito[e].cantidad * this.carrito[e].precio;
    }
    this.dataSourceCart = new MatTableDataSource(tempData);

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


  createPDF(productXVenta : any, total : string, discount : string, date : string){

    var rows = [];
    rows.push([ 'ID de Producto', 'Nombre', 'Cantidad', 'Precio' ]);
    var fCompra = 'Fecha de la compra:  ' + date;
    var pTotal = 'Precio total de la compra:  ' + total;
    var dCompra = 'Descuento total de la compra: ' + discount;
    var encabezado = 'Lista de Artículos adquiridos: '
    for (var product of productXVenta){
      rows.push([product.IDProducto, product.nombre, product.cantidad, product.precio])
    }
    const pdfDefinition: any  = {
      // Styles for text on the pdf
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center'
        },
        chapter: {
          italics: true,
          fontSize: 12,
          alignment: 'right',
          lineHeight: 2
        },
        sentence: {
          italics: true,
          fontSize: 10,
          alignment: 'left',
          lineHeight: 2
        }
      },
      pageSize: 'A4',
      // Header and Footer
      header: { text: 'Minisúper GyA', style: 'header' },
      footer: { text: 'Gracias por su compra!',  style: 'header' },
      content: [
        {
          text: 'Teléfono: 8417-6120',
          style: 'chapter',
        },
        {
          text: 'Dirección: 250mts al norte del MOPT, Buenos Aires',
          style: 'chapter',
        },
        {
          text: fCompra,
          style: 'chapter',
        },
        {
          text: encabezado,
          style: 'sentence',
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
            body: rows
          }
        },
        {
          text: dCompra,
          style: 'chapter',
        },
        {
          text: pTotal,
          style: 'chapter',
        }
      ]
    };
    const pdf = pdfMake.createPdf(pdfDefinition).download();
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
    this.venta.fecha = (new Date()).toString();
    if(this.isEfectivo){
      this.venta.metodo = "EFECTIVO";
    } else {
      this.venta.metodo = "TARJETA";
    }
    this.venta.monto = this.formVenta.value.total;
    await this.addVenta();
    await this.getVentaByDate(this.venta.fecha);
    for(var e in this.carrito){
      this.productoxventa.IDProducto = this.carrito[e].IDProducto;
      this.productoxventa.IDVenta = this.venta.IDVenta;
      this.productoxventa.cantidad = this.carrito[e].cantidad;
      await this.addProductoXVenta();
    }
    await this.getAllPXVByIDVenta(Number(this.venta.IDVenta));
    
    if (this.checkedFactura){
      this.createPDF(this.productosxventas,this.venta.monto,this.venta.descuento,this.venta.fecha);
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
      await this.getProductoBarras(barCode);
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