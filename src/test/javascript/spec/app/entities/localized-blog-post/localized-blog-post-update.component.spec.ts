import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedBlogPostUpdateComponent } from 'app/entities/localized-blog-post/localized-blog-post-update.component';
import { LocalizedBlogPostService } from 'app/entities/localized-blog-post/localized-blog-post.service';
import { LocalizedBlogPost } from 'app/shared/model/localized-blog-post.model';

describe('Component Tests', () => {
  describe('LocalizedBlogPost Management Update Component', () => {
    let comp: LocalizedBlogPostUpdateComponent;
    let fixture: ComponentFixture<LocalizedBlogPostUpdateComponent>;
    let service: LocalizedBlogPostService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedBlogPostUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocalizedBlogPostUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedBlogPostUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedBlogPostService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedBlogPost(123);
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
        const entity = new LocalizedBlogPost();
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
