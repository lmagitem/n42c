import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthDeploymentMapUpdateComponent } from 'app/entities/localized-ninth-deployment-map/localized-ninth-deployment-map-update.component';
import { LocalizedNinthDeploymentMapService } from 'app/entities/localized-ninth-deployment-map/localized-ninth-deployment-map.service';
import { LocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';

describe('Component Tests', () => {
  describe('LocalizedNinthDeploymentMap Management Update Component', () => {
    let comp: LocalizedNinthDeploymentMapUpdateComponent;
    let fixture: ComponentFixture<LocalizedNinthDeploymentMapUpdateComponent>;
    let service: LocalizedNinthDeploymentMapService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthDeploymentMapUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LocalizedNinthDeploymentMapUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedNinthDeploymentMapUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedNinthDeploymentMapService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LocalizedNinthDeploymentMap(123);
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
        const entity = new LocalizedNinthDeploymentMap();
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
