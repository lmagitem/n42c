import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartSkillCategoryDetailComponent } from 'app/entities/profile-part-skill-category/profile-part-skill-category-detail.component';
import { ProfilePartSkillCategory } from 'app/shared/model/profile-part-skill-category.model';

describe('Component Tests', () => {
  describe('ProfilePartSkillCategory Management Detail Component', () => {
    let comp: ProfilePartSkillCategoryDetailComponent;
    let fixture: ComponentFixture<ProfilePartSkillCategoryDetailComponent>;
    const route = ({ data: of({ profilePartSkillCategory: new ProfilePartSkillCategory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartSkillCategoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfilePartSkillCategoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfilePartSkillCategoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load profilePartSkillCategory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profilePartSkillCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
