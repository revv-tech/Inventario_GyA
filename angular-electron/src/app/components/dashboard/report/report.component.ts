import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductoService } from 'src/app/services/producto.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  dataSource: any;
  displayedColumns: string[] = ['IDProducto', 'nombre', 'precio', 'cantidad', 'Actions'];
  rangoDeFechas: any;
  

  constructor(private fb: FormBuilder, private productService: ProductoService, private router: Router, private _snackBar: MatSnackBar){
    this.rangoDeFechas = this.fb.group({
      firstDate :[''],
      lastDate : ['']
    })
  }
}
