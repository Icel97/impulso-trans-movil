import { Component, AfterViewInit } from '@angular/core';

declare var Calendly: any;

@Component({
  selector: 'app-calendly-widget',
  templateUrl: './calendly-widget.component.html',
  styleUrls: ['./calendly-widget.component.scss'],
})

export class CalendlyWidgetComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    this.loadCalendlyWidget();
  }

  loadCalendlyWidget() {
    Calendly.initInlineWidget({
      url: 'https://calendly.com/juridicoimpulsotrans/orientacion-juridica-clon-1',
      parentElement: document.getElementById('calendly-widget'),
      prefill: {},
      utm: {}
    });
  }
}
