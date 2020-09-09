import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { N42CTestModule } from '../../../test.module';
import { LocalizedPostContentComponent } from 'app/entities/localized-post-content/localized-post-content.component';
import { LocalizedPostContentService } from 'app/entities/localized-post-content/localized-post-content.service';
import { LocalizedPostContent } from 'app/shared/model/localized-post-content.model';

describe('Component Tests', () => {
  describe('LocalizedPostContent Management Component', () => {
    let comp: LocalizedPostContentComponent;
    let fixture: ComponentFixture<LocalizedPostContentComponent>;
    let service: LocalizedPostContentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [LocalizedPostContentComponent],
      })
        .overrideTemplate(LocalizedPostContentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocalizedPostContentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LocalizedPostContentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LocalizedPostContent(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.localizedPostContents && comp.localizedPostContents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
