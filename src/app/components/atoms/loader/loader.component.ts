import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader/loader.service'; 

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading: Observable<boolean> = this.loaderService.loading$;
  constructor(private loaderService: LoaderService) {}
  ngOnInit(): void {}

}
