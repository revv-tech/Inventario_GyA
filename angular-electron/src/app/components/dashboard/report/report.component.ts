// SELECT productoxventa.IDProducto, productoxventa.IDVenta, SUM(productoxventa.cantidad) FROM productoxventa INNER JOIN venta ON productoxventa.IDVenta = venta.IDVenta INNER JOIN producto ON productoxventa.IDProducto = producto.IDProducto WHERE venta.fecha >= '2023-01-08 00:00:00' and venta.fecha <= '2023-01-08 23:59:59' GROUP BY producto.typeiva

import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  cierreDisabled = null;
  pipe = new DatePipe('en-US');
  currentUser: any;
  dataSourceCierres: any;
  dataSourceProductos: any;
  displayedColumnsCierres: string[] = ['Cantidad de Ventas', 'Total', 'Subtotal', 'Tipo de IVA'];
  displayedColumnsProductos: string[] = ['Codigo de Barra', 'Codigo CABYS', 'Producto', 'Cantidad'];
  rangoDeFechas: any;
  report: any;
  productos = null;
  ventas = null;
  selectedOption = null;

  constructor(private fb: FormBuilder, private productService: ProductoService, private ventaService: VentaService, private router: Router, private _snackBar: MatSnackBar, private data: DataService){
    this.rangoDeFechas = this.fb.group({
      firstDate :[''],
      lastDate : ['']
    })
  }

  ngOnInit() : void{
    this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }

  async getVentasByDateRange(){
    const data$ = this.ventaService.getVentasByDateRange(this.rangoDeFechas.firstDate, this.rangoDeFechas.lastDate); 
    const data = await lastValueFrom(data$);
    this.ventas = data;
    var tempVenta = {
      cantidad: null,
      subtotal: null,
      total: null,
      typeiva: null
    };
    for(var e in this.ventas){
      tempVenta.cantidad += Number(this.ventas[e].cantidad);
      tempVenta.subtotal += Number(this.ventas[e].subtotal);
      tempVenta.total += Number(this.ventas[e].total);
    }
    tempVenta.typeiva = "AMBOS";
    this.ventas.unshift(tempVenta);
  }

  async getLessSoldProducts(){
    const data$ = this.ventaService.getLessSoldProducts(this.rangoDeFechas.firstDate, this.rangoDeFechas.lastDate); 
    const data = await lastValueFrom(data$);
    this.productos = data;
  }

  async getMostSelledProducts(){
    const data$ = this.ventaService.getMostSelledProducts(this.rangoDeFechas.firstDate, this.rangoDeFechas.lastDate); 
    const data = await lastValueFrom(data$);
    this.productos = data;
  }

  async setElementData(){
    let tempData = [];
    for (let e in this.ventas) {
      tempData.push(this.ventas[e]);
    }
    this.dataSourceCierres = new MatTableDataSource(tempData);

    tempData = [];
    for (let e in this.productos) {
      tempData.push(this.productos[e]);
    }
    this.dataSourceProductos = new MatTableDataSource(tempData);
  }

  async generar(){
    this.ventas = null;
    if(this.selectedOption === 'reporteVentas'){
      await this.getVentasByDateRange();
    } else if(this.selectedOption === 'cierreDiario'){
      this.changeLastDate(this.rangoDeFechas.firstDate.substring(0, this.rangoDeFechas.firstDate.length - 9));
      await this.getVentasByDateRange();
    } else if(this.selectedOption === 'cierreMensual'){;
      const date = new Date(this.rangoDeFechas.firstDate.substring(0, this.rangoDeFechas.firstDate.length - 9));
      var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
      var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.rangoDeFechas.firstDate = this.pipe.transform(primerDia, 'yyyy-MM-dd') + ' 00:00:00';
      this.rangoDeFechas.lastDate = this.pipe.transform(ultimoDia, 'yyyy-MM-dd') + ' 23:59:59';
      await this.getVentasByDateRange();
    } else if(this.selectedOption === 'menosVendidos'){
      await this.getLessSoldProducts();
    } else if(this.selectedOption === 'masVendidos'){
      await this.getMostSelledProducts();
    }
    this.setElementData()
  }

  changeFirstDate(value){
    let fecha = this.pipe.transform(value, 'yyyy-MM-dd');
    this.rangoDeFechas.firstDate = fecha + ' 00:00:00';
  }

  changeLastDate(value){
    let fecha = this.pipe.transform(value, 'yyyy-MM-dd');
    this.rangoDeFechas.lastDate = fecha + ' 23:59:59';
  }

  changeSelected(value){
    this.selectedOption = value;
    if(value === 'menosVendidos' || value === 'masVendidos'){
      this.cierreDisabled = true;
    } else {
      this.cierreDisabled = false;
    }
  }
}
