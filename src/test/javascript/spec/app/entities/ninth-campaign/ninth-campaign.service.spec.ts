import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NinthCampaignService } from 'app/entities/ninth-campaign/ninth-campaign.service';
import { INinthCampaign, NinthCampaign } from 'app/shared/model/ninth-campaign.model';
import { NinthGameType } from 'app/shared/model/enumerations/ninth-game-type.model';

describe('Service Tests', () => {
  describe('NinthCampaign Service', () => {
    let injector: TestBed;
    let service: NinthCampaignService;
    let httpMock: HttpTestingController;
    let elemDefault: INinthCampaign;
    let expectedResult: INinthCampaign | INinthCampaign[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(NinthCampaignService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new NinthCampaign(0, NinthGameType.OP, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a NinthCampaign', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new NinthCampaign()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a NinthCampaign', () => {
        const returnedFromService = Object.assign(
          {
            gameType: 'BBBBBB',
            usePowerRating: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of NinthCampaign', () => {
        const returnedFromService = Object.assign(
          {
            gameType: 'BBBBBB',
            usePowerRating: true,
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

      it('should delete a NinthCampaign', () => {
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
