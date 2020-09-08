import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NinthMissionService } from 'app/entities/ninth-mission/ninth-mission.service';
import { INinthMission, NinthMission } from 'app/shared/model/ninth-mission.model';
import { NinthGameType } from 'app/shared/model/enumerations/ninth-game-type.model';
import { NinthGameSize } from 'app/shared/model/enumerations/ninth-game-size.model';

describe('Service Tests', () => {
  describe('NinthMission Service', () => {
    let injector: TestBed;
    let service: NinthMissionService;
    let httpMock: HttpTestingController;
    let elemDefault: INinthMission;
    let expectedResult: INinthMission | INinthMission[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NinthMissionService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new NinthMission(0, NinthGameType.OP, NinthGameSize.CP, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a NinthMission', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new NinthMission()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a NinthMission', () => {
        const returnedFromService = Object.assign(
          {
            gameType: 'BBBBBB',
            gameSize: 'BBBBBB',
            shareable: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of NinthMission', () => {
        const returnedFromService = Object.assign(
          {
            gameType: 'BBBBBB',
            gameSize: 'BBBBBB',
            shareable: true,
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

      it('should delete a NinthMission', () => {
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
