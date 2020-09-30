import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthDeploymentMapDetailComponent } from 'app/entities/localized-ninth-deployment-map/localized-ninth-deployment-map-detail.component';
import { LocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';

describe('Component Tests', () => {
  describe('LocalizedNinthDeploymentMap Management Detail Component', () => {
    let comp: LocalizedNinthDeploymentMapDetailComponent;
    let fixture: ComponentFixture<LocalizedNinthDeploymentMapDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ localizedNinthDeploymentMap: new LocalizedNinthDeploymentMap(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthDeploymentMapDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedNinthDeploymentMapDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedNinthDeploymentMapDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load localizedNinthDeploymentMap on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedNinthDeploymentMap).toEqual(jasmine.objectContaining({ id: 123 }));
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
