import { KeycloakService } from "keycloak-angular";
import { KeycloakConfig } from "../config/keycloak-config";

export function keycloakConfigProvider(service: KeycloakService) {
    return async () => {
        await service.init(new KeycloakConfig())
    };
}