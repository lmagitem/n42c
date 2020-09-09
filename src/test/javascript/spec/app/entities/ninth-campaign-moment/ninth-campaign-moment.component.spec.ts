import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthCampaignMomentComponent } from 'app/entities/ninth-campaign-moment/ninth-campaign-moment.component';
import { NinthCampaignMomentService } from 'app/entities/ninth-campaign-moment/ninth-campaign-moment.service';
import { NinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';

describe('Component Tests', () => {
  describe('NinthCampaignMoment Management Component', () => {
    let comp: NinthCampaignMomentComponent;
    let fixture: ComponentFixture<NinthCampaignMomentComponent>;
    let service: NinthCampaignMomentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthCampaignMomentComponent],
      })
        .overrideTemplate(NinthCampaignMomentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthCampaignMomentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthCampaignMomentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthCampaignMoment(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthCampaignMoments && comp.ninthCampaignMoments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
