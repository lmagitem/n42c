import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { LocalizedBlogCategoryComponent } from 'app/entities/localized-blog-category/localized-blog-category.component';
import { LocalizedBlogCategoryService } from 'app/entities/localized-blog-category/localized-blog-category.service';
import { LocalizedBlogCategory } from 'app/shared/model/localized-blog-category.model';

describe('Component Tests', () => {
  describe('LocalizedBlogCategory Management Component', () => {
    let comp: LocalizedBlogCategoryComponent;
    let fixture: ComponentFixture<LocalizedBlogCategoryComponent>;
    let service: LocalizedBlogCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedBlogCategoryComponent],
      })
        .overrideTemplate(LocalizedBlogCategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedBlogCategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedBlogCategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocalizedBlogCategory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localizedBlogCategories && comp.localizedBlogCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
