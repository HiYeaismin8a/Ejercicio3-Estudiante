import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  constructor(private httpClient: HttpClient) {}

  async tomarFoto() {
    // Take a photo
    return await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
  }
}
