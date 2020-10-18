import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ILocalizedNinthStratagem, LocalizedNinthStratagem } from 'app/shared/model/localized-ninth-stratagem.model';
import { LocalizedNinthStratagemService } from './localized-ninth-stratagem.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { INinthStratagem } from 'app/shared/model/ninth-stratagem.model';
import { NinthStratagemService } from 'app/entities/ninth-stratagem/ninth-stratagem.service';

@Component({
  selector: 'jhi-localized-ninth-stratagem-update',
  templateUrl: './localized-ninth-stratagem-update.component.html',
})
export class LocalizedNinthStratagemUpdateComponent implements OnInit {
  isSaving = false;
  ninthstratagems: INinthStratagem[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    summary: [],
    description: [],
    keywords: [],
    language: [null, [Validators.required]],
    stratagem: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected localizedNinthStratagemService: LocalizedNinthStratagemService,
    protected ninthStratagemService: NinthStratagemService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ localizedNinthStratagem }) => {
      this.updateForm(localizedNinthStratagem);

      this.ninthStratagemService.query().subscribe((res: HttpResponse<INinthStratagem[]>) => (this.ninthstratagems = res.body || []));
    });
  }

  updateForm(localizedNinthStratagem: ILocalizedNinthStratagem): void {
    this.editForm.patchValue({
      id: localizedNinthStratagem.id,
      name: localizedNinthStratagem.name,
      summary: localizedNinthStratagem.summary,
      description: localizedNinthStratagem.description,
      keywords: localizedNinthStratagem.keywords,
      language: localizedNinthStratagem.language,
      stratagem: localizedNinthStratagem.stratagem,
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
    const localizedNinthStratagem = this.createFromForm();
    if (localizedNinthStratagem.id !== undefined) {
      this.subscribeToSaveResponse(this.localizedNinthStratagemService.update(localizedNinthStratagem));
    } else {
      this.subscribeToSaveResponse(this.localizedNinthStratagemService.create(localizedNinthStratagem));
    }
  }

  private createFromForm(): ILocalizedNinthStratagem {
    return {
      ...new LocalizedNinthStratagem(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      summary: this.editForm.get(['summary'])!.value,
      description: this.editForm.get(['description'])!.value,
      keywords: this.editForm.get(['keywords'])!.value,
      language: this.editForm.get(['language'])!.value,
      stratagem: this.editForm.get(['stratagem'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocalizedNinthStratagem>>): void {
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

  trackById(index: number, item: INinthStratagem): any {
    return item.id;
  }
}
