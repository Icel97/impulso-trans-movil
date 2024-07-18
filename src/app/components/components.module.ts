import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { CalendlyWidgetComponent } from "./calendly-widget/calendly-widget.component";

@NgModule({
  declarations: [NavMenuComponent, CalendlyWidgetComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [NavMenuComponent, CalendlyWidgetComponent],
})

export class ComponentsModule {}