import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedBlogCategoryDetailComponent } from 'app/entities/localized-blog-category/localized-blog-category-detail.component';
import { LocalizedBlogCategory } from 'app/shared/model/localized-blog-category.model';

describe('Component Tests', () => {
  describe('LocalizedBlogCategory Management Detail Component', () => {
    let comp: LocalizedBlogCategoryDetailComponent;
    let fixture: ComponentFixture<LocalizedBlogCategoryDetailComponent>;
    const route = ({ data: of({ localizedBlogCategory: new LocalizedBlogCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedBlogCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedBlogCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedBlogCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load localizedBlogCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedBlogCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
