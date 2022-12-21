import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ProductoService } from 'src/app/services/producto.service';

export interface Product {
  idProduct: number;
  name: string;
  barCode: number;
  cabyCode: string;
  price: number;
  iva: number;
  quantity: number;
}

const ELEMENT_DATA: Product[] = [
  {idProduct: 1, name: 'Hydrogen', barCode: 1.0079, cabyCode: 'H', price: 5000, iva: 0.13, quantity: 50},
  {idProduct: 2, name: 'Mantequilla', barCode: 1.9, cabyCode: 'f', price: 6000, iva: 0.13, quantity: 50},
];

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
    contraseña: null,
    codigoBarra: null,
    codigoCabys: null,
    iva: null,
    nombre: null,
    precio: null,
    IDVenta: null,
    IDBodega: null
  };
  displayedColumns: string[] = ['idProduct', 'name', 'price', 'quantity', 'actions'];
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

  }

  getAllUsers() {
    this.productService.getAllProductos().subscribe(result => 
      this.products = result);
  }

  addUser(){
    this.productService.addProducto(this.products).subscribe(datos =>{
      if(datos['resultado'] === 'OK') {
        alert(datos['mensaje']);
        this.getAllUsers();
      }
      
    });
  }
  
  deleteUser(IDUsuario: number){
    this.productService.deleteProducto(IDUsuario).subscribe(datos =>{
      if(datos['resultado'] === 'OK') {
        alert(datos['mensaje']);
        this.getAllUsers();
      }
    });
  }
  /*
  updateUser(){
    // console.log("se presiono modificar");
    this.productService.updateUser(this.user).subscribe(datos =>{
      if(datos['resultado'] === 'OK') {
        alert(datos['mensaje']);
        this.getAllUsers();
      }
      
    });
  }
  */
  getUser(IDProduct){
    this.productService.getProducto(IDProduct).subscribe(datos =>
      this.product = datos[0]);
  }
}
