import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  url = 'http://localhost/AngularPHP/';

  constructor(private http: HttpClient) { }

  getAllVentas(){
    return this.http.get(`${this.url}getAllVentas.php`);
  }

  addVenta(venta){
    return this.http.post(`${this.url}addVenta.php`, JSON.stringify(venta));
  }

  deleteVenta(IDVenta:number){
    return this.http.get(`${this.url}deleteVenta.php?IDVenta=${IDVenta}`);
  }

  getVenta(IDVenta:number){
    return this.http.get(`${this.url}getVenta.php?IDVenta=${IDVenta}`);
  }

  getVentaByDate(fecha){
    return this.http.get(`${this.url}getVentaByDate.php?fecha=${fecha}`);
  }

  updateVenta(venta){
    return this.http.post(`${this.url}updateVenta.php`, JSON.stringify(venta));
  }

  getProductoBarras(codigoBarra:number){
    return this.http.get(`${this.url}getProductoBarras.php?codigoBarra=${codigoBarra}`);
  }

  getProductoNombre(nombre:String){
    return this.http.get(`${this.url}getProductoNombre.php?nombre=${nombre}`);
  }

  getVentasByDateRange(fechaInicio, fechaFinal){
    return this.http.get(`${this.url}getVentasByDateRange.php?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`);
  }

  getLessSoldProducts(fechaInicio, fechaFinal){
    return this.http.get(`${this.url}getLessSoldProducts.php?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`);
  }

  getMostSelledProducts(fechaInicio, fechaFinal){
    return this.http.get(`${this.url}getMostSelledProducts.php?fechaInicio=${fechaInicio}&fechaFinal=${fechaFinal}`);
  }

}
