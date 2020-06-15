import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartSkillDetailComponent } from 'app/entities/profile-part-skill/profile-part-skill-detail.component';
import { ProfilePartSkill } from 'app/shared/model/profile-part-skill.model';

describe('Component Tests', () => {
  describe('ProfilePartSkill Management Detail Component', () => {
    let comp: ProfilePartSkillDetailComponent;
    let fixture: ComponentFixture<ProfilePartSkillDetailComponent>;
    const route = ({ data: of({ profilePartSkill: new ProfilePartSkill(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartSkillDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfilePartSkillDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfilePartSkillDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load profilePartSkill on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profilePartSkill).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
