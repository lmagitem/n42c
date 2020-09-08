import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthDeploymentMapComponent } from 'app/entities/localized-ninth-deployment-map/localized-ninth-deployment-map.component';
import { LocalizedNinthDeploymentMapService } from 'app/entities/localized-ninth-deployment-map/localized-ninth-deployment-map.service';
import { LocalizedNinthDeploymentMap } from 'app/shared/model/localized-ninth-deployment-map.model';

describe('Component Tests', () => {
  describe('LocalizedNinthDeploymentMap Management Component', () => {
    let comp: LocalizedNinthDeploymentMapComponent;
    let fixture: ComponentFixture<LocalizedNinthDeploymentMapComponent>;
    let service: LocalizedNinthDeploymentMapService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthDeploymentMapComponent],
      })
        .overrideTemplate(LocalizedNinthDeploymentMapComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedNinthDeploymentMapComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedNinthDeploymentMapService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocalizedNinthDeploymentMap(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localizedNinthDeploymentMaps && comp.localizedNinthDeploymentMaps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
