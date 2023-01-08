import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule,
    MatTabsModule
  ],
  exports: [
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule,
    MatTabsModule
  ]
})
export class SharedComponentsModule { }
