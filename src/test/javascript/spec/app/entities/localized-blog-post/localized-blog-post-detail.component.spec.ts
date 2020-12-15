import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { N42CTestModule } from '../../../test.module';
import { LocalizedBlogPostDetailComponent } from 'app/entities/localized-blog-post/localized-blog-post-detail.component';
import { LocalizedBlogPost } from 'app/shared/model/localized-blog-post.model';

describe('Component Tests', () => {
  describe('LocalizedBlogPost Management Detail Component', () => {
    let comp: LocalizedBlogPostDetailComponent;
    let fixture: ComponentFixture<LocalizedBlogPostDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ localizedBlogPost: new LocalizedBlogPost(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedBlogPostDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedBlogPostDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedBlogPostDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load localizedBlogPost on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedBlogPost).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
