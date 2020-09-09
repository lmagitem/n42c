import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthDeploymentMapUpdateComponent } from 'app/entities/ninth-deployment-map/ninth-deployment-map-update.component';
import { NinthDeploymentMapService } from 'app/entities/ninth-deployment-map/ninth-deployment-map.service';
import { NinthDeploymentMap } from 'app/shared/model/ninth-deployment-map.model';

describe('Component Tests', () => {
  describe('NinthDeploymentMap Management Update Component', () => {
    let comp: NinthDeploymentMapUpdateComponent;
    let fixture: ComponentFixture<NinthDeploymentMapUpdateComponent>;
    let service: NinthDeploymentMapService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthDeploymentMapUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthDeploymentMapUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthDeploymentMapUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthDeploymentMapService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthDeploymentMap(123);
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
        const entity = new NinthDeploymentMap();
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
