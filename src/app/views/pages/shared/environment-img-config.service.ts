import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentImgConfigService {
  logo: string;
  defaultAvatar: string;
  defaultCardImage: string;
  constructor() { }

  getLogoImage() {
    return this.logo = 'assets/media/logos/logo-light.png';

  }

  getUserDefaultAvatar() {
    return this.defaultAvatar = 'assets/media/logos/davatar.png';
  }

  getDefaultCardImage() {
    return this.defaultCardImage = 'assets/media/cards/cardImg.jpg'
  }
}
