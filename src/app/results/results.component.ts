import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.change.subscribe(response => {
      this.results = response;
    });
  }

}
