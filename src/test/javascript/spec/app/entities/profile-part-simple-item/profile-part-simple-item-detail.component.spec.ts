import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { N42CTestModule } from '../../../test.module';
import { ProfilePartSimpleItemDetailComponent } from 'app/entities/profile-part-simple-item/profile-part-simple-item-detail.component';
import { ProfilePartSimpleItem } from 'app/shared/model/profile-part-simple-item.model';

describe('Component Tests', () => {
  describe('ProfilePartSimpleItem Management Detail Component', () => {
    let comp: ProfilePartSimpleItemDetailComponent;
    let fixture: ComponentFixture<ProfilePartSimpleItemDetailComponent>;
    const route = ({ data: of({ profilePartSimpleItem: new ProfilePartSimpleItem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [ProfilePartSimpleItemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfilePartSimpleItemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfilePartSimpleItemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load profilePartSimpleItem on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profilePartSimpleItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
