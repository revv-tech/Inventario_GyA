import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  url = 'http://localhost/AngularPHP/';

  constructor(private http: HttpClient) { }

  getAllInventarios(){
    return this.http.get(`${this.url}getAllInventarios.php`);
  }

  addInventario(inventario){
    return this.http.post(`${this.url}addInventario.php`, JSON.stringify(inventario));
  }

  deleteInventario(IDInventario:number){
    return this.http.get(`${this.url}deleteInventario.php?IDInventario=${IDInventario}`);
  }

  getInventario(IDInventario:number){
    return this.http.get(`${this.url}getInventario.php?IDInventario=${IDInventario}`);
  }

  updateInventario(inventario){
    return this.http.post(`${this.url}updateInventario.php`, JSON.stringify(inventario));
  }
}
