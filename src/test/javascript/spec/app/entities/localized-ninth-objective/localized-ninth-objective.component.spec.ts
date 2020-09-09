import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthObjectiveComponent } from 'app/entities/localized-ninth-objective/localized-ninth-objective.component';
import { LocalizedNinthObjectiveService } from 'app/entities/localized-ninth-objective/localized-ninth-objective.service';
import { LocalizedNinthObjective } from 'app/shared/model/localized-ninth-objective.model';

describe('Component Tests', () => {
  describe('LocalizedNinthObjective Management Component', () => {
    let comp: LocalizedNinthObjectiveComponent;
    let fixture: ComponentFixture<LocalizedNinthObjectiveComponent>;
    let service: LocalizedNinthObjectiveService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthObjectiveComponent],
      })
        .overrideTemplate(LocalizedNinthObjectiveComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedNinthObjectiveComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedNinthObjectiveService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocalizedNinthObjective(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localizedNinthObjectives && comp.localizedNinthObjectives[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
