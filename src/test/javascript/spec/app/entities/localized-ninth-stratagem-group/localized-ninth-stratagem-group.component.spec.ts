import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthStratagemGroupComponent } from 'app/entities/localized-ninth-stratagem-group/localized-ninth-stratagem-group.component';
import { LocalizedNinthStratagemGroupService } from 'app/entities/localized-ninth-stratagem-group/localized-ninth-stratagem-group.service';
import { LocalizedNinthStratagemGroup } from 'app/shared/model/localized-ninth-stratagem-group.model';

describe('Component Tests', () => {
  describe('LocalizedNinthStratagemGroup Management Component', () => {
    let comp: LocalizedNinthStratagemGroupComponent;
    let fixture: ComponentFixture<LocalizedNinthStratagemGroupComponent>;
    let service: LocalizedNinthStratagemGroupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthStratagemGroupComponent],
      })
        .overrideTemplate(LocalizedNinthStratagemGroupComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedNinthStratagemGroupComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedNinthStratagemGroupService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocalizedNinthStratagemGroup(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localizedNinthStratagemGroups && comp.localizedNinthStratagemGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
