import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthBattleDetailComponent } from 'app/entities/ninth-battle/ninth-battle-detail.component';
import { NinthBattle } from 'app/shared/model/ninth-battle.model';

describe('Component Tests', () => {
  describe('NinthBattle Management Detail Component', () => {
    let comp: NinthBattleDetailComponent;
    let fixture: ComponentFixture<NinthBattleDetailComponent>;
    const route = ({ data: of({ ninthBattle: new NinthBattle(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthBattleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(NinthBattleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthBattleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ninthBattle on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ninthBattle).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
