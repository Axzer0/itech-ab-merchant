import { Component, OnInit } from '@angular/core';
import { EnvironmentImgConfigService } from '../shared/environment-img-config.service';

@Component({
  selector: 'kt-start-free-proceed',
  templateUrl: './start-free-proceed.component.html',
  styleUrls: ['./start-free-proceed.component.scss']
})
export class StartFreeProceedComponent implements OnInit {

  constructor(
    private environmentImgConfigService: EnvironmentImgConfigService
  ) { }

  ngOnInit() {
  }

  getLogo() {
    return this.environmentImgConfigService.getLogoImage();
  }

}
