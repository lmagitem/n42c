import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { NinthBattleUpdateComponent } from 'app/entities/ninth-battle/ninth-battle-update.component';
import { NinthBattleService } from 'app/entities/ninth-battle/ninth-battle.service';
import { NinthBattle } from 'app/shared/model/ninth-battle.model';

describe('Component Tests', () => {
  describe('NinthBattle Management Update Component', () => {
    let comp: NinthBattleUpdateComponent;
    let fixture: ComponentFixture<NinthBattleUpdateComponent>;
    let service: NinthBattleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthBattleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(NinthBattleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NinthBattleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthBattleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthBattle(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new NinthBattle();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
