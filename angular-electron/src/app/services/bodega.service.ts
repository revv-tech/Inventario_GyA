import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  url = 'http://localhost/AngularPHP/';

  constructor(private http: HttpClient) { }

  getAllBodegas(){
    return this.http.get(`${this.url}getAllBodegas.php`);
  }

  addBodega(bodega){
    return this.http.post(`${this.url}addBodega.php`, JSON.stringify(bodega));
  }

  deleteBodega(IDBodega:number){
    return this.http.get(`${this.url}deleteBodega.php?IDBodega=${IDBodega}`);
  }

  getBodega(IDBodega:number){
    return this.http.get(`${this.url}getBodega.php?IDBodega=${IDBodega}`);
  }

  updateBodega(bodega){
    return this.http.post(`${this.url}updateBodega.php`, JSON.stringify(bodega));
  }
}
