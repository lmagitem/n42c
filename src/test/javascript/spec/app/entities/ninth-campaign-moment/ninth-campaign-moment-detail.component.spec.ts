import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { N42CTestModule } from '../../../test.module';
import { NinthCampaignMomentDetailComponent } from 'app/entities/ninth-campaign-moment/ninth-campaign-moment-detail.component';
import { NinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';

describe('Component Tests', () => {
  describe('NinthCampaignMoment Management Detail Component', () => {
    let comp: NinthCampaignMomentDetailComponent;
    let fixture: ComponentFixture<NinthCampaignMomentDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ ninthCampaignMoment: new NinthCampaignMoment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthCampaignMomentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthCampaignMomentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthCampaignMomentDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load ninthCampaignMoment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthCampaignMoment).toEqual(jasmine.objectContaining({ id: 123 }));
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
