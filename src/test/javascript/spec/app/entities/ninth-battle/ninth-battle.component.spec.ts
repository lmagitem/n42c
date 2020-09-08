import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { NinthBattleComponent } from 'app/entities/ninth-battle/ninth-battle.component';
import { NinthBattleService } from 'app/entities/ninth-battle/ninth-battle.service';
import { NinthBattle } from 'app/shared/model/ninth-battle.model';

describe('Component Tests', () => {
  describe('NinthBattle Management Component', () => {
    let comp: NinthBattleComponent;
    let fixture: ComponentFixture<NinthBattleComponent>;
    let service: NinthBattleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthBattleComponent],
      })
        .overrideTemplate(NinthBattleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthBattleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthBattleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new NinthBattle(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ninthBattles && comp.ninthBattles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
