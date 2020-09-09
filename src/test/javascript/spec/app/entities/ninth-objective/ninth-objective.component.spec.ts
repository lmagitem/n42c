import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthObjectiveComponent } from 'app/entities/ninth-objective/ninth-objective.component';
import { NinthObjectiveService } from 'app/entities/ninth-objective/ninth-objective.service';
import { NinthObjective } from 'app/shared/model/ninth-objective.model';

describe('Component Tests', () => {
  describe('NinthObjective Management Component', () => {
    let comp: NinthObjectiveComponent;
    let fixture: ComponentFixture<NinthObjectiveComponent>;
    let service: NinthObjectiveService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthObjectiveComponent],
      })
        .overrideTemplate(NinthObjectiveComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthObjectiveComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthObjectiveService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthObjective(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthObjectives && comp.ninthObjectives[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
