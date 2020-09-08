import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthMissionComponent } from 'app/entities/ninth-mission/ninth-mission.component';
import { NinthMissionService } from 'app/entities/ninth-mission/ninth-mission.service';
import { NinthMission } from 'app/shared/model/ninth-mission.model';

describe('Component Tests', () => {
  describe('NinthMission Management Component', () => {
    let comp: NinthMissionComponent;
    let fixture: ComponentFixture<NinthMissionComponent>;
    let service: NinthMissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthMissionComponent],
      })
        .overrideTemplate(NinthMissionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthMissionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthMissionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthMission(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthMissions && comp.ninthMissions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
