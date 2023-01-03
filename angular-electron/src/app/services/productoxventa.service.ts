import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoxventaService {
  url = 'http://localhost/AngularPHP/';

  constructor(private http: HttpClient) { }

  getAllProductosXVentas(){
    return this.http.get(`${this.url}getAllProductosXVentas.php`);
  }

  getAllPXVByIDVenta(IDVenta){
    return this.http.get(`${this.url}getAllPXVByIDVenta.phpIDVenta=${IDVenta}`);
  }

  addProductoXVenta(productoxventa){
    return this.http.post(`${this.url}addProductoXVenta.php`, JSON.stringify(productoxventa));
  }

  deleteProductoXVenta(IDProductoXVenta){
    return this.http.get(`${this.url}deleteProductoXVenta.php?IDProductoXVenta=${IDProductoXVenta}`);
  }

  getProductoXVenta(IDProductoXVenta){
    return this.http.get(`${this.url}getProductoXVenta.php?IDProductoXVenta=${IDProductoXVenta}`);
  }

  updateProductoXVenta(productoxventa){
    return this.http.post(`${this.url}updateProductoXVenta.php`, JSON.stringify(productoxventa));
  }
}
