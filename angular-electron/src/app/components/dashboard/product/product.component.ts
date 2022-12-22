import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ProductoService } from 'src/app/services/producto.service';
import { lastValueFrom } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

export interface Product {
  IDProducto: any;
  cantidad: any;
  codigoBarra: any;
  codigoCabys: any;
  iva: any;
  nombre: any;
  precio: any;
  IDVenta: any;
  IDBodega: any;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form: FormGroup
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
  displayedColumns: string[] = ['IDProducto', 'nombre', 'precio', 'cantidad', 'Actions'];
  dataSource: any;

  constructor( private fb: FormBuilder, private productService: ProductoService){
    this.form = this.fb.group({
      nameProduct : [''],
      barCode : [''],
      cabyCode : [''],
      price : [''],
      iva : [''],
      quantity : [''],
    })
  }

  ngAfterViewInit() {
    this.paginator = this.paginator;
  }

  ngOnInit() : void{
    this.setElementData();
  }

  async getAllProductos() {
    const data$ = this.productService.getAllProductos(); 
    const data = await lastValueFrom(data$);
    this.products = data;
  }

  async addProduct(){
    const data$ = this.productService.addProducto(this.product);
    const data = await lastValueFrom(data$);
    if (data['resultado'] === 'OK') {
      alert(data['mensaje']);
      this.getAllProductos();
    }
  }
  
  async deleteProducto(IDProducto){
    const data$ = this.productService.deleteProducto(IDProducto);
    const data = await lastValueFrom(data$);
    if (data['resultado'] === 'OK') {
      alert(data['mensaje']);
      this.getAllProductos();
    }
  }

  async updateProducto(){
    const data$ = this.productService.updateProducto(this.product);
    const data = await lastValueFrom(data$);
    if (data['resultado'] === 'OK') {
      alert(data['mensaje']);
      this.getAllProductos();
    }
  }

  async getProducto(IDProducto){
    const data$ = this.productService.getProducto(IDProducto);
    const data = await lastValueFrom(data$);
    this.product = data[0];
  }

  async setElementData(){
    this.resetForm();
    let tempData: Product[] = [];
    await this.getAllProductos();
    for (let e in this.products) {
      tempData.push(this.products[e]);
    }
    this.dataSource = new MatTableDataSource(tempData);
  }

  async agregar(){
    // Obtenemos valores del formulario
    const name = this.form.value.nameProduct;
    const barCode = this.form.value.barCode;
    const cabyCode = this.form.value.cabyCode;
    const price = this.form.value.price;
    const iva = this.form.value.iva;
    const quantity = this.form.value.quantity;
    // Asignamos valores al objeto producto
    this.product.cantidad = quantity;
    this.product.codigoBarra = barCode;
    this.product.codigoCabys = cabyCode;
    this.product.iva = iva;
    this.product.nombre = name;
    this.product.precio = price;
    // consulta SQL
    await this.addProduct();
    await this.setElementData();
  }

  async eliminar(id){
    await this.deleteProducto(id);
    await this.setElementData();
  }

  async editar(){
    // Obtenemos valores del formularioS
    const name = this.form.value.nameProduct;
    const barCode = this.form.value.barCode;
    const cabyCode = this.form.value.cabyCode;
    const price = this.form.value.price;
    const iva = this.form.value.iva;
    const quantity = this.form.value.quantity;
    // Asignamos valores al objeto producto
    this.product.cantidad = quantity;
    this.product.codigoBarra = barCode;
    this.product.codigoCabys = cabyCode;
    this.product.iva = iva;
    this.product.nombre = name;
    this.product.precio = price;
    this.product.IDVenta = 'NULL';
    // consulta SQL
    await this.updateProducto();
    await this.setElementData();
  }

  cargarProducto(element){
    // Cargamos datos en el formulario
    this.form.setValue({
      nameProduct: element.nombre,
      barCode: element.codigoBarra,
      cabyCode: element.codigoCabys,
      price: element.precio,
      iva: element.iva,
      quantity: element.cantidad
    });
    // Asignamos valores al objeto producto
    this.product.IDProducto = element.IDProducto;
    this.product.cantidad = element.cantidad;
    this.product.codigoBarra = element.codigoBarra;
    this.product.codigoCabys = element.codigoCabys;
    this.product.iva = element.iva;
    this.product.nombre = element.nombre;
    this.product.precio = element.precio;
    this.product.IDVenta = element.IDVenta;
  }

  resetForm(){
    this.form.setValue({
      nameProduct: ' ',
      barCode: ' ',
      cabyCode: ' ',
      price: ' ',
      iva: ' ',
      quantity: ' '
    });
  }
}
