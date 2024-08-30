// commonFunctions.ts
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctions {

  constructor(private alertController: AlertController) {}

  /**
   * Muestra una alerta con un mensaje y un botón de cierre.
   * @param header - El encabezado de la alerta.
   * @param message - El mensaje de la alerta.
   * @param buttonText - El texto del botón de cierre.
   */
  async showAlert(header: string, message: string, buttonText: string = 'OK') {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [buttonText]
    });

    await alert.present();
  }
}
