import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedPostContentUpdateComponent } from 'app/entities/localized-post-content/localized-post-content-update.component';
import { LocalizedPostContentService } from 'app/entities/localized-post-content/localized-post-content.service';
import { LocalizedPostContent } from 'app/shared/model/localized-post-content.model';

describe('Component Tests', () => {
  describe('LocalizedPostContent Management Update Component', () => {
    let comp: LocalizedPostContentUpdateComponent;
    let fixture: ComponentFixture<LocalizedPostContentUpdateComponent>;
    let service: LocalizedPostContentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedPostContentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocalizedPostContentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedPostContentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedPostContentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedPostContent(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedPostContent();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
