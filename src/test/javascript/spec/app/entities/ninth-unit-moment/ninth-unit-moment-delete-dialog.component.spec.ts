import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { N42CTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { NinthUnitMomentDeleteDialogComponent } from 'app/entities/ninth-unit-moment/ninth-unit-moment-delete-dialog.component';
import { NinthUnitMomentService } from 'app/entities/ninth-unit-moment/ninth-unit-moment.service';

describe('Component Tests', () => {
  describe('NinthUnitMoment Management Delete Component', () => {
    let comp: NinthUnitMomentDeleteDialogComponent;
    let fixture: ComponentFixture<NinthUnitMomentDeleteDialogComponent>;
    let service: NinthUnitMomentService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [N42CTestModule],
        declarations: [NinthUnitMomentDeleteDialogComponent],
      })
        .overrideTemplate(NinthUnitMomentDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NinthUnitMomentDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NinthUnitMomentService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
