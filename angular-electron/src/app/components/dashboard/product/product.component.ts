import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

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
  displayedColumns: string[] = ['idProduct', 'name', 'price', 'quantity', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor( private fb: FormBuilder){
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
}
