import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { LocalizedBlogPostComponent } from 'app/entities/localized-blog-post/localized-blog-post.component';
import { LocalizedBlogPostService } from 'app/entities/localized-blog-post/localized-blog-post.service';
import { LocalizedBlogPost } from 'app/shared/model/localized-blog-post.model';

describe('Component Tests', () => {
  describe('LocalizedBlogPost Management Component', () => {
    let comp: LocalizedBlogPostComponent;
    let fixture: ComponentFixture<LocalizedBlogPostComponent>;
    let service: LocalizedBlogPostService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedBlogPostComponent],
      })
        .overrideTemplate(LocalizedBlogPostComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedBlogPostComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedBlogPostService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocalizedBlogPost(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localizedBlogPosts && comp.localizedBlogPosts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
