import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedBlogDetailComponent } from 'app/entities/localized-blog/localized-blog-detail.component';
import { LocalizedBlog } from 'app/shared/model/localized-blog.model';

describe('Component Tests', () => {
  describe('LocalizedBlog Management Detail Component', () => {
    let comp: LocalizedBlogDetailComponent;
    let fixture: ComponentFixture<LocalizedBlogDetailComponent>;
    const route = ({ data: of({ localizedBlog: new LocalizedBlog(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedBlogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedBlogDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedBlogDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load localizedBlog on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedBlog).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
