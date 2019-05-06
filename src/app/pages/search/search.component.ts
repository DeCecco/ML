import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  text = '';
  results: any;
  // formSearch: FormGroup;
  constructor(private api: ApiService, private router: Router /*public formBuilder: FormBuilder*/) {
    /*this.formSearch = formBuilder.group({
      text: [this.text]

    });*/
  }

  ngOnInit() {
  }


  search() {
    if (this.text) {
      this.router.navigate(['items?search=', this.text]);
    }
  }
}
