import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedBlogUpdateComponent } from 'app/entities/localized-blog/localized-blog-update.component';
import { LocalizedBlogService } from 'app/entities/localized-blog/localized-blog.service';
import { LocalizedBlog } from 'app/shared/model/localized-blog.model';

describe('Component Tests', () => {
  describe('LocalizedBlog Management Update Component', () => {
    let comp: LocalizedBlogUpdateComponent;
    let fixture: ComponentFixture<LocalizedBlogUpdateComponent>;
    let service: LocalizedBlogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedBlogUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocalizedBlogUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedBlogUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedBlogService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedBlog(123);
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
        const entity = new LocalizedBlog();
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
