import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/**
 * Server-side Angular
 */
// === Main Module
export { AppServerModule } from './app/app.server.module';
// === For server-side rendering process
export { renderModule, renderModuleFactory } from '@angular/platform-server';
