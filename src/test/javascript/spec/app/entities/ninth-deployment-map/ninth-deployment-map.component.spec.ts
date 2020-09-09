import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthDeploymentMapComponent } from 'app/entities/ninth-deployment-map/ninth-deployment-map.component';
import { NinthDeploymentMapService } from 'app/entities/ninth-deployment-map/ninth-deployment-map.service';
import { NinthDeploymentMap } from 'app/shared/model/ninth-deployment-map.model';

describe('Component Tests', () => {
  describe('NinthDeploymentMap Management Component', () => {
    let comp: NinthDeploymentMapComponent;
    let fixture: ComponentFixture<NinthDeploymentMapComponent>;
    let service: NinthDeploymentMapService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthDeploymentMapComponent],
      })
        .overrideTemplate(NinthDeploymentMapComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthDeploymentMapComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthDeploymentMapService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthDeploymentMap(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthDeploymentMaps && comp.ninthDeploymentMaps[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
