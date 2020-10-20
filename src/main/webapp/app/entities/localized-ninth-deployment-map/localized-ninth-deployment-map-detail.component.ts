import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ILocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';

@Component({
  selector: 'jhi-localized-ninth-deployment-map-detail',
  templateUrl: './localized-ninth-deployment-map-detail.component.html',
})
export class LocalizedNinthDeploymentMapDetailComponent implements OnInit {
  localizedNinthDeploymentMap: ILocalizedNinthDeploymentMap | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      ({ localizedNinthDeploymentMap }) => (this.localizedNinthDeploymentMap = localizedNinthDeploymentMap)
    );
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
