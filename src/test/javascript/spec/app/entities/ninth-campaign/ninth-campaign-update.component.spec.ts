import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthCampaignUpdateComponent } from 'app/entities/ninth-campaign/ninth-campaign-update.component';
import { NinthCampaignService } from 'app/entities/ninth-campaign/ninth-campaign.service';
import { NinthCampaign } from 'app/shared/model/ninth-campaign.model';

describe('Component Tests', () => {
  describe('NinthCampaign Management Update Component', () => {
    let comp: NinthCampaignUpdateComponent;
    let fixture: ComponentFixture<NinthCampaignUpdateComponent>;
    let service: NinthCampaignService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthCampaignUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthCampaignUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthCampaignUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthCampaignService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthCampaign(123);
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
        const entity = new NinthCampaign();
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
