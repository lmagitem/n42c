import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthCampaignComponent } from 'app/entities/ninth-campaign/ninth-campaign.component';
import { NinthCampaignService } from 'app/entities/ninth-campaign/ninth-campaign.service';
import { NinthCampaign } from 'app/shared/model/ninth-campaign.model';

describe('Component Tests', () => {
  describe('NinthCampaign Management Component', () => {
    let comp: NinthCampaignComponent;
    let fixture: ComponentFixture<NinthCampaignComponent>;
    let service: NinthCampaignService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthCampaignComponent],
      })
        .overrideTemplate(NinthCampaignComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthCampaignComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthCampaignService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthCampaign(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthCampaigns && comp.ninthCampaigns[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
