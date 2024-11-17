import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { PurchaseReport } from 'src/app/shared/interfaces/report.interface';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { ReportPersistenceService } from 'src/app/shared/services/report-persistence/report-persistence.service';

@Component({
  selector: 'app-list-reports-page',
  templateUrl: './list-reports-page.component.html',
  styleUrls: ['./list-reports-page.component.scss'],
})
export class ListReportsPageComponent implements OnInit {
  constructor(
    private readonly reportPersistneceService: ReportPersistenceService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  purchaseReport: PurchaseReport[] = [];
  loadReports(): void {
    this.loaderService.show();
    this.reportPersistneceService.getReports()
    .pipe(finalize(()=> this.loaderService.hide()))
    .subscribe((response) => {
      console.log(response);

      this.purchaseReport = response;
    });
  }
}
