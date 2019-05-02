import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  text = '';
  results: any;
  // formSearch: FormGroup;
  constructor(private api: ApiService,  /*public formBuilder: FormBuilder*/) {
    /*this.formSearch = formBuilder.group({
      text: [this.text]

    });*/
  }

  ngOnInit() {
  }


  search() {
    if (this.text) {
      this.api.search(this.text).then(response => {
        console.info(response);
        this.results = response;
        this.api.middle(this.results)
      }).catch(error => {
        console.error(error);
      })
    }
  }
}
