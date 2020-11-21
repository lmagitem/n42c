import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { LocalizedBlogComponent } from 'app/entities/localized-blog/localized-blog.component';
import { LocalizedBlogService } from 'app/entities/localized-blog/localized-blog.service';
import { LocalizedBlog } from 'app/shared/model/localized-blog.model';

describe('Component Tests', () => {
  describe('LocalizedBlog Management Component', () => {
    let comp: LocalizedBlogComponent;
    let fixture: ComponentFixture<LocalizedBlogComponent>;
    let service: LocalizedBlogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedBlogComponent],
      })
        .overrideTemplate(LocalizedBlogComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedBlogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedBlogService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocalizedBlog(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localizedBlogs && comp.localizedBlogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
