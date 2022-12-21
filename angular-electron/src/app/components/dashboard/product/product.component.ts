import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ProductoService } from 'src/app/services/producto.service';
import { lastValueFrom } from 'rxjs';

export interface Product {
  IDProducto: null;
  cantidad: null;
  codigoBarra: null;
  codigoCabys: null;
  iva: null;
  nombre: null;
  precio: null;
  IDVenta: null;
  IDBodega: null;
}

let ELEMENT_DATA: Product[] = [];

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
  dataSource = ELEMENT_DATA;

  constructor( private fb: FormBuilder, private productService: ProductoService){
    this.form = this.fb.group({
      nameProduct : ['',Validators.required],
      barCode : ['',Validators.required],
      cabyCode : ['',Validators.required],
      price : ['',Validators.required],
      iva : ['',Validators.required],
      quantity : ['',Validators.required],
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
  
  async deleteProducto(IDUsuario: number){
    const data$ = this.productService.deleteProducto(IDUsuario);
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
    let tempData: Product[] = [];
    await this.getAllProductos();
    for (let e in this.products) {
      tempData.push(this.products[e]);
    }
    ELEMENT_DATA = tempData;
    console.log(ELEMENT_DATA);
  }

  async agregar(){
    const name = this.form.value.nameProduct;
    const barCode = this.form.value.barCode;
    const cabyCode = this.form.value.cabyCode;
    const price = this.form.value.price;
    const iva = this.form.value.iva;
    const quantity = this.form.value.quantity;

    this.product.IDBodega = 2;
    this.product.cantidad = quantity;
    this.product.codigoBarra = barCode;
    this.product.codigoCabys = cabyCode;
    this.product.iva = iva;
    this.product.nombre = name;
    this.product.precio = price;

    await this.addProduct();

    await this.getAllProductos();
    console.log(this.products);
  }
}
