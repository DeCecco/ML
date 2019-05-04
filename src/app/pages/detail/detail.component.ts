import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: any;
  details: any;
  constructor(private api: ApiService, private activateR: ActivatedRoute) {
    this.id = this.activateR.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.seeDetail(this.id);
  }

  seeDetail(id) {
    this.api.detail(id).then(response => {
      this.details = response;
      console.info(response)
    }).catch(error => {
      console.error(error);
    })
  }

}
