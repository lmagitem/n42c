import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthMissionComponent } from 'app/entities/localized-ninth-mission/localized-ninth-mission.component';
import { LocalizedNinthMissionService } from 'app/entities/localized-ninth-mission/localized-ninth-mission.service';
import { LocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';

describe('Component Tests', () => {
  describe('LocalizedNinthMission Management Component', () => {
    let comp: LocalizedNinthMissionComponent;
    let fixture: ComponentFixture<LocalizedNinthMissionComponent>;
    let service: LocalizedNinthMissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthMissionComponent],
      })
        .overrideTemplate(LocalizedNinthMissionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedNinthMissionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedNinthMissionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocalizedNinthMission(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localizedNinthMissions && comp.localizedNinthMissions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
