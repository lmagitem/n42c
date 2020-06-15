import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { BlogCategoryComponent } from 'app/entities/blog-category/blog-category.component';
import { BlogCategoryService } from 'app/entities/blog-category/blog-category.service';
import { BlogCategory } from 'app/shared/model/blog-category.model';

describe('Component Tests', () => {
  describe('BlogCategory Management Component', () => {
    let comp: BlogCategoryComponent;
    let fixture: ComponentFixture<BlogCategoryComponent>;
    let service: BlogCategoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [BlogCategoryComponent],
      })
        .overrideTemplate(BlogCategoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BlogCategoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BlogCategoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BlogCategory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.blogCategories && comp.blogCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
