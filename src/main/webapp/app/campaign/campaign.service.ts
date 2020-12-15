import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NinthCampaignMomentService} from 'app/entities/ninth-campaign-moment/ninth-campaign-moment.service';
import {NinthCampaignService} from 'app/entities/ninth-campaign/ninth-campaign.service';
import {INinthCampaignMoment, NinthCampaignMoment} from 'app/shared/model/ninth-campaign-moment.model';
import {INinthCampaign, NinthCampaign} from 'app/shared/model/ninth-campaign.model';
import * as _ from 'lodash';
import {BehaviorSubject, Observable} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CampaignService {
  private reroutingEnabled = false;
  private selectedCampaign = new BehaviorSubject<INinthCampaign>(new NinthCampaign());
  public selectedCampaign$: Observable<INinthCampaign> = this.selectedCampaign.asObservable();
  private selectedCampaignId = new BehaviorSubject<number>(-1);
  public selectedCampaignId$: Observable<number> = this.selectedCampaignId.asObservable();
  private selectedCampaignMoment = new BehaviorSubject<INinthCampaignMoment>(new NinthCampaignMoment());
  public selectedCampaignMoment$: Observable<INinthCampaignMoment> = this.selectedCampaignMoment.asObservable();
  private selectedCampaignMomentId = new BehaviorSubject<number>(-1);
  public selectedCampaignMomentId$: Observable<number> = this.selectedCampaignMomentId.asObservable();
  private selectedCampaignMomentsIds = new BehaviorSubject<number[]>([]);
  public selectedCampaignMomentsIds$: Observable<number[]> = this.selectedCampaignMomentsIds.asObservable();
  private currentlyEditingCampaign = new BehaviorSubject<boolean>(false);
  public currentlyEditingCampaign$: Observable<boolean> = this.currentlyEditingCampaign.asObservable();
  private currentlyEditingCampaignMoment = new BehaviorSubject<boolean>(false);
  public currentlyEditingCampaignMoment$: Observable<boolean> = this.currentlyEditingCampaignMoment.asObservable();

  constructor(
    private campaignService: NinthCampaignService,
    private campaignMomentService: NinthCampaignMomentService,
    private router: Router
  ) {
  }

  updateSelectedCampaignId(id: number): void {
    if (id && id !== -1) {
      this.campaignService
        .find(id)
        .pipe(first())
        .subscribe((ninthCampaign: HttpResponse<NinthCampaign>) => {
          if (ninthCampaign.body) {
            this.selectedCampaignId.next(id);
            this.selectedCampaign.next(ninthCampaign.body);
            this.updateSelectedCampaignMomentsIds().then(() => {
              this.selectNewestCampaignMomentFromIds();
            });
          } else {
            this.selectedCampaignId.next(-1);
            this.selectedCampaign.next(new NinthCampaign());
            this.setCampaignEditingStatus(true);
            this.updateSelectedCampaignMomentId(-1);
          }
        });
    } else {
      this.selectedCampaignId.next(-1);
      this.selectedCampaign.next(new NinthCampaign());
      this.setCampaignEditingStatus(true);
      this.updateSelectedCampaignMomentId(-1);
    }
  }

  updateSelectedCampaignMomentId(id: number, forceReload = false): void {
    const oldId = this.selectedCampaignMomentId.value;
    if (id && id !== -1) {
      this.campaignMomentService
        .find(id)
        .pipe(first())
        .subscribe((ninthCampaignMoment: HttpResponse<NinthCampaignMoment>) => {
          if (ninthCampaignMoment.body) {
            this.selectedCampaignMomentId.next(id);
            this.selectedCampaignMoment.next(ninthCampaignMoment.body);
            if (oldId !== id || forceReload) {
              this.navigateToMomentRoute();
            }
          } else {
            this.selectedCampaignMomentId.next(-1);
            this.selectedCampaignMoment.next(new NinthCampaignMoment());
            if (oldId !== id || forceReload) {
              this.navigateToMomentRoute();
            }
          }
        });
    } else {
      this.selectedCampaignMomentId.next(-1);
      this.selectedCampaignMoment.next(new NinthCampaignMoment());
      if (oldId !== id || forceReload) {
        this.navigateToMomentRoute();
      }
    }
  }

  updateSelectedCampaignMomentsIds(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const id = this.selectedCampaignId.value;
      if (id !== null && id !== -1) {
        this.campaignService
          .queryMomentsIds(id)
          .pipe(first())
          .subscribe((res: HttpResponse<number[]>) => {
            const ids = res.body || [];
            this.selectedCampaignMomentsIds.next(ids);
            resolve(true);
          });
      } else {
        this.selectedCampaignMomentsIds.next([]);
        resolve(false);
      }
    });
  }

  selectNewestCampaignMomentFromIds(): void {
    const ids = this.selectedCampaignMomentsIds.value;
    if (ids.length > 0) {
      this.updateSelectedCampaignMomentId(ids[ids.length - 1], true);
    } else {
      this.updateSelectedCampaignMomentId(-1, true);
    }
  }

  addNewCampaignMoment(): void {
    // Add to the current list of ids
    const ids = _.cloneDeep(this.selectedCampaignMomentsIds.value);
    const index = ids.findIndex(e => e === this.selectedCampaignMomentId.value);
    if (index >= 0) {
      ids.splice(index, 0, -1);
    }
    // Then make the necessary so that we show the create moment screen
    this.updateSelectedCampaignMomentId(-1);
    this.setCampaignMomentEditingStatus(true);
  }

  setCampaignEditingStatus(status: boolean): void {
    this.currentlyEditingCampaign.next(status);
  }

  setCampaignMomentEditingStatus(status: boolean): void {
    this.currentlyEditingCampaignMoment.next(status);
  }

  selectPreviousCampaignMoment(): void {
    const ids = this.selectedCampaignMomentsIds.value;
    let newIndex = ids.findIndex(id => this.selectedCampaignMomentId.value === id) - 1;
    newIndex = newIndex < 0 ? 0 : newIndex;
    this.updateSelectedCampaignMomentId(ids[newIndex]);
  }

  selectNextCampaignMoment(): void {
    const ids = this.selectedCampaignMomentsIds.value;
    let newIndex = ids.findIndex(id => this.selectedCampaignMomentId.value === id) + 1;
    newIndex = newIndex >= ids.length ? ids.length - 1 : newIndex;
    this.updateSelectedCampaignMomentId(ids[newIndex]);
  }

  public resetService(): void {
    this.reroutingEnabled = false;
    this.selectedCampaign.next(new NinthCampaign());
    this.selectedCampaignId.next(-1);
    this.selectedCampaignMoment.next(new NinthCampaignMoment());
    this.selectedCampaignMomentId.next(-1);
    this.selectedCampaignMomentsIds.next([]);
    this.currentlyEditingCampaign.next(false);
    this.currentlyEditingCampaignMoment.next(false);
  }

  public enableRerouting(value: boolean): void {
    this.reroutingEnabled = value;
  }

  /** If some id changes, navigate to the proper route */
  private navigateToMomentRoute(): void {
    if (this.reroutingEnabled) {
      const campaignId = this.selectedCampaignId.value;
      if (campaignId !== -1) {
        const momentId = this.selectedCampaignMomentId.value;
        if (momentId === -1) {
          this.router.navigate(['campaign', campaignId, 'moment', 'new']);
        } else {
          this.router.navigate(['campaign', campaignId, 'moment', momentId]);
        }
      }
    }
  }
}
