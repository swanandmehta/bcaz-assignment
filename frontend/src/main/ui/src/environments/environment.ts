export const environment = {
  production: false,
  desc: 'Default Env',
  realms: "bcas",
  serverUrl: 'http://localhost:8083',
  authUrl: 'http://localhost:8081/auth',
  clientId: "local",
  refreshInterval: 30,
  redirectUrl: 'http://localhost:8082/',
  loginUrl: 'http://localhost:8081/auth/realms/bcas/protocol/openid-connect/auth?client_id=local&response_type=code&redirect_uri=http://localhost:8082/'
};
