import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NinthUnitService } from 'app/entities/ninth-unit/ninth-unit.service';
import { INinthUnit, NinthUnit } from 'app/shared/model/ninth-unit.model';
import { Faction } from 'app/shared/model/enumerations/faction.model';
import { SubFaction } from 'app/shared/model/enumerations/sub-faction.model';
import { NinthBattlefieldRole } from 'app/shared/model/enumerations/ninth-battlefield-role.model';

describe('Service Tests', () => {
  describe('NinthUnit Service', () => {
    let injector: TestBed;
    let service: NinthUnitService;
    let httpMock: HttpTestingController;
    let elemDefault: INinthUnit;
    let expectedResult: INinthUnit | INinthUnit[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NinthUnitService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new NinthUnit(0, 'AAAAAAA', 'AAAAAAA', Faction.IM, SubFaction.SM, NinthBattlefieldRole.HQ, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a NinthUnit', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new NinthUnit()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a NinthUnit', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            datasheet: 'BBBBBB',
            faction: 'BBBBBB',
            subfaction: 'BBBBBB',
            battlefieldRole: 'BBBBBB',
            keywords: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of NinthUnit', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            datasheet: 'BBBBBB',
            faction: 'BBBBBB',
            subfaction: 'BBBBBB',
            battlefieldRole: 'BBBBBB',
            keywords: 'BBBBBB',
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

      it('should delete a NinthUnit', () => {
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
