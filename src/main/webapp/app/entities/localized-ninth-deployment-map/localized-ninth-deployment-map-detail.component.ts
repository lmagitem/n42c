import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';

@Component({
  selector: 'jhi-localized-ninth-deployment-map-detail',
  templateUrl: './localized-ninth-deployment-map-detail.component.html',
})
export class LocalizedNinthDeploymentMapDetailComponent implements OnInit {
  localizedNinthDeploymentMap: ILocalizedNinthDeploymentMap | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ localizedNinthDeploymentMap }) => (this.localizedNinthDeploymentMap = localizedNinthDeploymentMap)
    );
  }

  previousState(): void {
    window.history.back();
  }
}
