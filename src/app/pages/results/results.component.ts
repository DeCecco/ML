import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  results: any;
  text: any;
  constructor(private api: ApiService, private router: Router, private activateR: ActivatedRoute) {
    this.text = this.activateR.snapshot.paramMap.get('query');
  }

  ngOnInit() {
    this.search(this.text);
  }
  search(text) {
    this.api.search(text).then(response => {
      console.info(response);
      this.results = response.items;
    }).catch(error => {
      console.error(error);
    })
  }
  detail(id) {
    if (id) {
      this.router.navigate(['/items', id]);
    }
  }

}

