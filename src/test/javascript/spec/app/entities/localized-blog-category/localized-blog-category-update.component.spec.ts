import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedBlogCategoryUpdateComponent } from 'app/entities/localized-blog-category/localized-blog-category-update.component';
import { LocalizedBlogCategoryService } from 'app/entities/localized-blog-category/localized-blog-category.service';
import { LocalizedBlogCategory } from 'app/shared/model/localized-blog-category.model';

describe('Component Tests', () => {
  describe('LocalizedBlogCategory Management Update Component', () => {
    let comp: LocalizedBlogCategoryUpdateComponent;
    let fixture: ComponentFixture<LocalizedBlogCategoryUpdateComponent>;
    let service: LocalizedBlogCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedBlogCategoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocalizedBlogCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedBlogCategoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedBlogCategoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedBlogCategory(123);
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
        const entity = new LocalizedBlogCategory();
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
