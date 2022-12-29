import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  currentUser: any;

  constructor(private data: DataService){  }

  ngOnInit() : void{
    this.data.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }
}