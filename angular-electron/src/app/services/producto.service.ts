import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost/AngularPHP/';

  constructor(private http: HttpClient) { }

  getAllProductos(){
    return this.http.get(`${this.url}getAllProductos.php`);
  }

  addProducto(producto){
    return this.http.post(`${this.url}addProducto.php`, JSON.stringify(producto));
  }

  deleteProducto(IDProducto:number){
    return this.http.get(`${this.url}deleteProducto.php?IDProducto=${IDProducto}`);
  }

  getProducto(IDProducto:number){
    return this.http.get(`${this.url}getProducto.php?IDProducto=${IDProducto}`);
  }

  updateProducto(producto){
    return this.http.post(`${this.url}updateProducto.php`, JSON.stringify(producto));
  }

  getProductoByName(name:number){
    return this.http.get(`${this.url}getProductoByName.php?name=${name}`);
  }
}
