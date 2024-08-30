import { Component, OnInit } from '@angular/core';
import { CalendlyService } from '../services/calendly/calendly.service';

@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.page.html',
  styleUrls: ['./asesorias.page.scss'],
})
export class AsesoriasPage implements OnInit {

  constructor(
    private calendlyService: CalendlyService
  ) { }

  ngOnInit() {
  }

  async scheduleEvent() {
    const token = 'your-access-token'; // Reemplaza esto con tu token de acceso
    const eventDetails = {
      "event": {
        "name": "Consulta con el cliente",
        "start_time": "2024-07-20T10:00:00Z",
        "end_time": "2024-07-20T11:00:00Z",
        "description": "Consulta para discutir los requerimientos del proyecto.",
        "location": "https://calendly.com/juridicoimpulsotrans/60min"
      }
    };

    try {
      const event = await this.calendlyService.createEvent(token, eventDetails);
      console.log('Evento creado:', event);
    } catch (error) {
      console.error('Error creando el evento', error);
    }
  }

}
