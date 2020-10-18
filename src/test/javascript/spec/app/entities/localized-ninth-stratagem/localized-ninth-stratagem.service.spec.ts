import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocalizedNinthStratagemService } from 'app/entities/localized-ninth-stratagem/localized-ninth-stratagem.service';
import { ILocalizedNinthStratagem, LocalizedNinthStratagem } from 'app/shared/model/localized-ninth-stratagem.model';
import { Language } from 'app/shared/model/enumerations/language.model';

describe('Service Tests', () => {
  describe('LocalizedNinthStratagem Service', () => {
    let injector: TestBed;
    let service: LocalizedNinthStratagemService;
    let httpMock: HttpTestingController;
    let elemDefault: ILocalizedNinthStratagem;
    let expectedResult: ILocalizedNinthStratagem | ILocalizedNinthStratagem[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(LocalizedNinthStratagemService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new LocalizedNinthStratagem(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', Language.EN);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a LocalizedNinthStratagem', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LocalizedNinthStratagem()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LocalizedNinthStratagem', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            summary: 'BBBBBB',
            description: 'BBBBBB',
            keywords: 'BBBBBB',
            language: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LocalizedNinthStratagem', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            summary: 'BBBBBB',
            description: 'BBBBBB',
            keywords: 'BBBBBB',
            language: 'BBBBBB',
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

      it('should delete a LocalizedNinthStratagem', () => {
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
