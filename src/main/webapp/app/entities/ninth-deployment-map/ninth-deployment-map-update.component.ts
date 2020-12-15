import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {INinthDeploymentMap, NinthDeploymentMap} from 'app/shared/model/ninth-deployment-map.model';
import {NinthDeploymentMapService} from './ninth-deployment-map.service';
import {INinthMission} from 'app/shared/model/ninth-mission.model';
import {NinthMissionService} from 'app/entities/ninth-mission/ninth-mission.service';

@Component({
  selector: 'jhi-ninth-deployment-map-update',
  templateUrl: './ninth-deployment-map-update.component.html',
})
export class NinthDeploymentMapUpdateComponent implements OnInit {
  isSaving = false;
  ninthmissions: INinthMission[] = [];

  editForm = this.fb.group({
    id: [],
    url: [],
    shareable: [],
    usedInMissions: [],
  });

  constructor(
    protected ninthDeploymentMapService: NinthDeploymentMapService,
    protected ninthMissionService: NinthMissionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ninthDeploymentMap }) => {
      this.updateForm(ninthDeploymentMap);

      this.ninthMissionService.query().subscribe((res: HttpResponse<INinthMission[]>) => (this.ninthmissions = res.body || []));
    });
  }

  updateForm(ninthDeploymentMap: INinthDeploymentMap): void {
    this.editForm.patchValue({
      id: ninthDeploymentMap.id,
      url: ninthDeploymentMap.url,
      shareable: ninthDeploymentMap.shareable,
      usedInMissions: ninthDeploymentMap.usedInMissions,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ninthDeploymentMap = this.createFromForm();
    if (ninthDeploymentMap.id !== undefined) {
      this.subscribeToSaveResponse(this.ninthDeploymentMapService.update(ninthDeploymentMap));
    } else {
      this.subscribeToSaveResponse(this.ninthDeploymentMapService.create(ninthDeploymentMap));
    }
  }

  private createFromForm(): INinthDeploymentMap {
    return {
      ...new NinthDeploymentMap(),
      id: this.editForm.get(['id'])!.value,
      url: this.editForm.get(['url'])!.value,
      shareable: this.editForm.get(['shareable'])!.value,
      usedInMissions: this.editForm.get(['usedInMissions'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INinthDeploymentMap>>): void {
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

  trackById(index: number, item: INinthMission): any {
    return item.id;
  }

  getSelected(selectedVals: INinthMission[], option: INinthMission): INinthMission {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
