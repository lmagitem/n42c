import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {INinthDeploymentMap} from 'app/shared/model/ninth-deployment-map.model';

@Component({
  selector: 'jhi-ninth-deployment-map-detail',
  templateUrl: './ninth-deployment-map-detail.component.html',
})
export class NinthDeploymentMapDetailComponent implements OnInit {
  ninthDeploymentMap: INinthDeploymentMap | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthDeploymentMap }) => (this.ninthDeploymentMap = ninthDeploymentMap));
  }

  previousState(): void {
    window.history.back();
  }
}
