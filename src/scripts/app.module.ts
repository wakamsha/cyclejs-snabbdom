import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {appRoutingProviders, routing} from './app.routing';
import {SnabbdomModule} from './snabbdom/snabbdom.module';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        SnabbdomModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        appRoutingProviders,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
