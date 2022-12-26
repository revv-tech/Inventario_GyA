import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/services/producto.service';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Product } from '../product/product.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  dataSource: any;
  displayedColumns: string[] = ['IDProducto', 'nombre', 'precio', 'cantidad'];
  rangoDeFechas: any;
  report: any;
  products = null;
  isEditar: boolean;
  product: any;

  constructor(private fb: FormBuilder, private productService: ProductoService, private router: Router, private _snackBar: MatSnackBar){
    this.rangoDeFechas = this.fb.group({
      firstDate :[''],
      lastDate : ['']
    })
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
  }
  
  async deleteProducto(IDProducto){
    const data$ = this.productService.deleteProducto(IDProducto);
    const data = await lastValueFrom(data$);
  }

  async updateProducto(){
    const data$ = this.productService.updateProducto(this.product);
    const data = await lastValueFrom(data$);
  }

  async getProducto(IDProducto){
    const data$ = this.productService.getProducto(IDProducto);
    const data = await lastValueFrom(data$);
    this.product = data[0];
  }

  async setElementData(){
    this.isEditar = false;
    let tempData: Product[] = [];
    await this.getAllProductos();
    for (let e in this.products) {
      tempData.push(this.products[e]);
    }
    this.dataSource = new MatTableDataSource(tempData);
  }


  cancelar(){
    console.log('Cancelar reporte')
  }
  generar(){
    console.log('Generar reporte')
  }
}
