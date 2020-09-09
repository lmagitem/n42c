import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthCampaignMomentUpdateComponent } from 'app/entities/ninth-campaign-moment/ninth-campaign-moment-update.component';
import { NinthCampaignMomentService } from 'app/entities/ninth-campaign-moment/ninth-campaign-moment.service';
import { NinthCampaignMoment } from 'app/shared/model/ninth-campaign-moment.model';

describe('Component Tests', () => {
  describe('NinthCampaignMoment Management Update Component', () => {
    let comp: NinthCampaignMomentUpdateComponent;
    let fixture: ComponentFixture<NinthCampaignMomentUpdateComponent>;
    let service: NinthCampaignMomentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthCampaignMomentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthCampaignMomentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthCampaignMomentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthCampaignMomentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthCampaignMoment(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthCampaignMoment();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
