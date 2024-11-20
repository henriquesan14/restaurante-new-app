import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AccessTokenInterceptor } from './core/interceptors/access-token.interceptor';
import { NotAuthenticatedInterceptor } from './core/interceptors/not-authenticard.interceptor';
import { provideToastr } from 'ngx-toastr';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { provideNgxMask } from 'ngx-mask';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

const maskConfig: any = {
  thousandSeparator: '.',
  decimalMarker: ',',
  dropSpecialCharacters: true, // Mantém a pontuação no valor
};

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    provideRouter(routes),
     provideHttpClient(withInterceptors([AccessTokenInterceptor, NotAuthenticatedInterceptor, ErrorHandlerInterceptor])),
       provideEnvironmentNgxMask(),
        provideAnimations(),
         provideToastr(),
         [provideNgxMask(maskConfig)],
         provideCharts(withDefaultRegisterables())
          ]
};
