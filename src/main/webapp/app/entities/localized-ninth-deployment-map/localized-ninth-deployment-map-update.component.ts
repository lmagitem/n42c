import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ILocalizedNinthDeploymentMap, LocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';
import { LocalizedNinthDeploymentMapService } from './localized-ninth-deployment-map.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
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
    language: [null, [Validators.required]],
    deploymentMap: [null, Validators.required],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
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
      language: localizedNinthDeploymentMap.language,
      deploymentMap: localizedNinthDeploymentMap.deploymentMap,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('n42cApp.error', { ...err, key: 'error.file.' + err.key })
      );
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
      language: this.editForm.get(['language'])!.value,
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
