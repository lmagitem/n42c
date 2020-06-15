import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { BlogCategoryDetailComponent } from 'app/entities/blog-category/blog-category-detail.component';
import { BlogCategory } from 'app/shared/model/blog-category.model';

describe('Component Tests', () => {
  describe('BlogCategory Management Detail Component', () => {
    let comp: BlogCategoryDetailComponent;
    let fixture: ComponentFixture<BlogCategoryDetailComponent>;
    const route = ({ data: of({ blogCategory: new BlogCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [BlogCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BlogCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BlogCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load blogCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.blogCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
