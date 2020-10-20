import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { N42CTestModule } from '../../../test.module';
import { LocalizedProductDetailComponent } from 'app/entities/localized-product/localized-product-detail.component';
import { LocalizedProduct } from 'app/shared/model/localized-product.model';

describe('Component Tests', () => {
  describe('LocalizedProduct Management Detail Component', () => {
    let comp: LocalizedProductDetailComponent;
    let fixture: ComponentFixture<LocalizedProductDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ localizedProduct: new LocalizedProduct(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedProductDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedProductDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedProductDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load localizedProduct on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedProduct).toEqual(jasmine.objectContaining({ id: 123 }));
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
