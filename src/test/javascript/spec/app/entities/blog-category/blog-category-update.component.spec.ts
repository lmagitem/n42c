import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { BlogCategoryUpdateComponent } from 'app/entities/blog-category/blog-category-update.component';
import { BlogCategoryService } from 'app/entities/blog-category/blog-category.service';
import { BlogCategory } from 'app/shared/model/blog-category.model';

describe('Component Tests', () => {
  describe('BlogCategory Management Update Component', () => {
    let comp: BlogCategoryUpdateComponent;
    let fixture: ComponentFixture<BlogCategoryUpdateComponent>;
    let service: BlogCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [BlogCategoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BlogCategoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BlogCategoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BlogCategoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BlogCategory(123);
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
        const entity = new BlogCategory();
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
