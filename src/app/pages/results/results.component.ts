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
  categories: any;
  L: any;
  constructor(private api: ApiService, private router: Router, private activateR: ActivatedRoute) {

    this.activateR.params.subscribe(params => {
      this.text = this.activateR.snapshot.paramMap.get('query');
      this.search(this.text);
    });
  }

  ngOnInit() {
  }

  search(text) {
    this.api.searchApi(text).then(response => {
      this.results = response;
      if (typeof this.results.categories !== 'string') {
        this.categories = this.results.categories;
        this.L = this.categories.length - 1;
      } else {
        this.categories = [{name : this.results.categories}];
        this.L = 0;
      }
      this.results = this.results.items;
    }).catch(error => {
      console.error(error);
    });
  }
  detail(id) {
    if (id) {

      this.api.changeCategory(this.categories);
      this.router.navigate(['/items', id]);
    }
  }

}

