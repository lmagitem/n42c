import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfilePartSkillService } from 'app/entities/profile-part-skill/profile-part-skill.service';
import { IProfilePartSkill, ProfilePartSkill } from 'app/shared/model/profile-part-skill.model';
import { LevelOfMastery } from 'app/shared/model/enumerations/level-of-mastery.model';

describe('Service Tests', () => {
  describe('ProfilePartSkill Service', () => {
    let injector: TestBed;
    let service: ProfilePartSkillService;
    let httpMock: HttpTestingController;
    let elemDefault: IProfilePartSkill;
    let expectedResult: IProfilePartSkill | IProfilePartSkill[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProfilePartSkillService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ProfilePartSkill(0, 'AAAAAAA', 0, LevelOfMastery.DA);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ProfilePartSkill', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ProfilePartSkill()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProfilePartSkill', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            index: 1,
            level: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ProfilePartSkill', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            index: 1,
            level: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ProfilePartSkill', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
