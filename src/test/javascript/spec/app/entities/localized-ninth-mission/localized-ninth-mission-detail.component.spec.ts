import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { LocalizedNinthMissionDetailComponent } from 'app/entities/localized-ninth-mission/localized-ninth-mission-detail.component';
import { LocalizedNinthMission } from 'app/shared/model/localized-ninth-mission.model';

describe('Component Tests', () => {
  describe('LocalizedNinthMission Management Detail Component', () => {
    let comp: LocalizedNinthMissionDetailComponent;
    let fixture: ComponentFixture<LocalizedNinthMissionDetailComponent>;
    const route = ({ data: of({ localizedNinthMission: new LocalizedNinthMission(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedNinthMissionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LocalizedNinthMissionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LocalizedNinthMissionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load localizedNinthMission on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.localizedNinthMission).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
