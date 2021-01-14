import { NgModule } from '@angular/core';

/**
 * Server-specific objects likes Request
 * -> can specify any server-specific logic &
 * -> override the functionality defined in AppModule
 */
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {ProductsService} from "./products.service";
import {ProductsServerService} from "./products-server.service";
import {UserService} from "./user.service";
import {UserServerService} from "./user-server.service";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: ProductsService, useClass: ProductsServerService},
    {provide: UserService, useClass: UserServerService}
  ]
})
export class AppServerModule {}
