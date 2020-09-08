import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { NinthArmyUnitMomentService } from 'app/entities/ninth-army-unit-moment/ninth-army-unit-moment.service';
import { INinthArmyUnitMoment, NinthArmyUnitMoment } from 'app/shared/model/ninth-army-unit-moment.model';
import { NinthCrusadeRank } from 'app/shared/model/enumerations/ninth-crusade-rank.model';

describe('Service Tests', () => {
  describe('NinthArmyUnitMoment Service', () => {
    let injector: TestBed;
    let service: NinthArmyUnitMomentService;
    let httpMock: HttpTestingController;
    let elemDefault: INinthArmyUnitMoment;
    let expectedResult: INinthArmyUnitMoment | INinthArmyUnitMoment[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NinthArmyUnitMomentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new NinthArmyUnitMoment(
        0,
        false,
        currentDate,
        0,
        0,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        NinthCrusadeRank.RE,
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            sinceInstant: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a NinthArmyUnitMoment', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            sinceInstant: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sinceInstant: currentDate,
          },
          returnedFromService
        );

        service.create(new NinthArmyUnitMoment()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a NinthArmyUnitMoment', () => {
        const returnedFromService = Object.assign(
          {
            current: true,
            sinceInstant: currentDate.format(DATE_TIME_FORMAT),
            pointsCost: 1,
            powerRating: 1,
            experiencePoints: 1,
            crusadePoints: 1,
            equipment: 'BBBBBB',
            psychicPowers: 'BBBBBB',
            warlordTraits: 'BBBBBB',
            relics: 'BBBBBB',
            otherUpgrades: 'BBBBBB',
            battlesPlayed: 1,
            battlesSurvived: 1,
            rangedKills: 1,
            meleeKills: 1,
            psychicKills: 1,
            crusadeRank: 'BBBBBB',
            battleHonours: 'BBBBBB',
            battleScars: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sinceInstant: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of NinthArmyUnitMoment', () => {
        const returnedFromService = Object.assign(
          {
            current: true,
            sinceInstant: currentDate.format(DATE_TIME_FORMAT),
            pointsCost: 1,
            powerRating: 1,
            experiencePoints: 1,
            crusadePoints: 1,
            equipment: 'BBBBBB',
            psychicPowers: 'BBBBBB',
            warlordTraits: 'BBBBBB',
            relics: 'BBBBBB',
            otherUpgrades: 'BBBBBB',
            battlesPlayed: 1,
            battlesSurvived: 1,
            rangedKills: 1,
            meleeKills: 1,
            psychicKills: 1,
            crusadeRank: 'BBBBBB',
            battleHonours: 'BBBBBB',
            battleScars: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sinceInstant: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a NinthArmyUnitMoment', () => {
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
