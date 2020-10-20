import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { N42CTestModule } from '../../../test.module';
import { NinthCampaignDetailComponent } from 'app/entities/ninth-campaign/ninth-campaign-detail.component';
import { NinthCampaign } from 'app/shared/model/ninth-campaign.model';

describe('Component Tests', () => {
  describe('NinthCampaign Management Detail Component', () => {
    let comp: NinthCampaignDetailComponent;
    let fixture: ComponentFixture<NinthCampaignDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ ninthCampaign: new NinthCampaign(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthCampaignDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthCampaignDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthCampaignDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load ninthCampaign on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthCampaign).toEqual(jasmine.objectContaining({ id: 123 }));
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
