import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthCampaignMomentDetailComponent } from 'app/entities/ninth-campaign-moment/ninth-campaign-moment-detail.component';
import { NinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';

describe('Component Tests', () => {
  describe('NinthCampaignMoment Management Detail Component', () => {
    let comp: NinthCampaignMomentDetailComponent;
    let fixture: ComponentFixture<NinthCampaignMomentDetailComponent>;
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
    });

    describe('OnInit', () => {
      it('Should load ninthCampaignMoment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthCampaignMoment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
