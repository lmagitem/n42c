import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILocalizedNinthDeploymentMap, LocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';
import { LocalizedNinthDeploymentMapService } from './localized-ninth-deployment-map.service';
import { INinthDeploymentMap } from 'app/shared/model/ninth-deployment-map.model';
import { NinthDeploymentMapService } from 'app/entities/ninth-deployment-map/ninth-deployment-map.service';

@Component({
  selector: 'jhi-localized-ninth-deployment-map-update',
  templateUrl: './localized-ninth-deployment-map-update.component.html',
})
export class LocalizedNinthDeploymentMapUpdateComponent implements OnInit {
  isSaving = false;
  ninthdeploymentmaps: INinthDeploymentMap[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    description: [],
    deploymentMap: [],
  });

  constructor(
    protected localizedNinthDeploymentMapService: LocalizedNinthDeploymentMapService,
    protected ninthDeploymentMapService: NinthDeploymentMapService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthDeploymentMap }) => {
      this.updateForm(localizedNinthDeploymentMap);

      this.ninthDeploymentMapService
        .query()
        .subscribe((res: HttpResponse<INinthDeploymentMap[]>) => (this.ninthdeploymentmaps = res.body || []));
    });
  }

  updateForm(localizedNinthDeploymentMap: ILocalizedNinthDeploymentMap): void {
    this.editForm.patchValue({
      id: localizedNinthDeploymentMap.id,
      name: localizedNinthDeploymentMap.name,
      description: localizedNinthDeploymentMap.description,
      deploymentMap: localizedNinthDeploymentMap.deploymentMap,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const localizedNinthDeploymentMap = this.createFromForm();
    if (localizedNinthDeploymentMap.id !== undefined) {
      this.subscribeToSaveResponse(this.localizedNinthDeploymentMapService.update(localizedNinthDeploymentMap));
    } else {
      this.subscribeToSaveResponse(this.localizedNinthDeploymentMapService.create(localizedNinthDeploymentMap));
    }
  }

  private createFromForm(): ILocalizedNinthDeploymentMap {
    return {
      ...new LocalizedNinthDeploymentMap(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      deploymentMap: this.editForm.get(['deploymentMap'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizedNinthDeploymentMap>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: INinthDeploymentMap): any {
    return item.id;
  }
}
