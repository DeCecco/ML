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
    
    this.activateR.params.subscribe(params => {
      this.text = this.activateR.snapshot.paramMap.get('query');
      this.search(this.text);
    });
  }

  ngOnInit() {
  }
  
  search(text) {
    // const json = [{'text': text}];
    this.api.searchApi(text).then(response => {
      console.info(response);
      this.results = response.items; // response.items;
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

