import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  currentUser: any;
  constructor(private data: DataService){  }
  ngOnInit() : void{
    this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }
}
