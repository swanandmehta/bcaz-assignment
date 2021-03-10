import { KeycloakOptions } from "keycloak-angular";
import { environment } from "src/environments/environment";
import { KeycloakOnLoad } from 'keycloak-js';

export class KeycloakConfig implements KeycloakOptions {
    config = {
        url: environment.authUrl,
        realm: environment.realms,
        clientId: environment.clientId
    }
    initOptions = {
        onLoad: 'check-sso' as KeycloakOnLoad,
        checkLoginIframe: false
    }
    enableBearerInterceptor = true

}