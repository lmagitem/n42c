import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthStratagemGroupComponent } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group.component';
import { NinthStratagemGroupService } from 'app/entities/ninth-stratagem-group/ninth-stratagem-group.service';
import { NinthStratagemGroup } from 'app/shared/model/ninth-stratagem-group.model';

describe('Component Tests', () => {
  describe('NinthStratagemGroup Management Component', () => {
    let comp: NinthStratagemGroupComponent;
    let fixture: ComponentFixture<NinthStratagemGroupComponent>;
    let service: NinthStratagemGroupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthStratagemGroupComponent],
      })
        .overrideTemplate(NinthStratagemGroupComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthStratagemGroupComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthStratagemGroupService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthStratagemGroup(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthStratagemGroups && comp.ninthStratagemGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
