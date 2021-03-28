import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-strorage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }
  onSaveData(){
    this.dataStorageService.storeRecipes();

  }
  onFetchData(){
    this.dataStorageService.fetchRecipes();

  }


}