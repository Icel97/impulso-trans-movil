import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CalendlyService {

  private baseUrl: string = 'https://api.calendly.com';

  constructor() { }

  async createEvent(token: string, eventDetails: any) {
    try {
      const response = await axios.post(`${this.baseUrl}/scheduled_events`, eventDetails, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating event', error);
      throw error;
    }
  }
}
