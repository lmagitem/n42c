import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { N42CTestModule } from '../../../test.module';
import { LocalizedPostContentDetailComponent } from 'app/entities/localized-post-content/localized-post-content-detail.component';
import { LocalizedPostContent } from 'app/shared/model/localized-post-content.model';

describe('Component Tests', () => {
  describe('LocalizedPostContent Management Detail Component', () => {
    let comp: LocalizedPostContentDetailComponent;
    let fixture: ComponentFixture<LocalizedPostContentDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ localizedPostContent: new LocalizedPostContent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedPostContentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedPostContentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedPostContentDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load localizedPostContent on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedPostContent).toEqual(jasmine.objectContaining({ id: 123 }));
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
