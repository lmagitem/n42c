import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthCampaignDetailComponent } from 'app/entities/ninth-campaign/ninth-campaign-detail.component';
import { NinthCampaign } from 'app/shared/model/ninth-campaign.model';

describe('Component Tests', () => {
  describe('NinthCampaign Management Detail Component', () => {
    let comp: NinthCampaignDetailComponent;
    let fixture: ComponentFixture<NinthCampaignDetailComponent>;
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
    });

    describe('OnInit', () => {
      it('Should load ninthCampaign on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthCampaign).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
