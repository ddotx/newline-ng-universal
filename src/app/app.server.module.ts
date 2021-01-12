import { NgModule } from '@angular/core';

/**
 * Server-specific objects likes Request
 * -> can specify any server-specific logic &
 * -> override the functionality defined in AppModule
 */
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
