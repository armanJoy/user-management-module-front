// // DVELOPMENT ENVIRONMENT
// export const environment = {
//     appVersion: "v-1.0.22.12.12",
//     production: true,
//     serverUrl: "http://localhost:8000/web",
//     SOCKET_ENDPOINT: 'http://localhost:8000/socket',
//     MOBILE_APP_BASE_URL: 'http://localhost:8100/'
// };

// INTERNAL RELEASE ENVIRONMENT
//export const environment = {
  //  appVersion: "v-1.0.22.12.12",
    //production: true,
//    serverUrl: "http://192.168.68.109:8000/web",
  //  SOCKET_ENDPOINT: 'http://192.168.68.109:8000/socket',
  //  MOBILE_APP_BASE_URL: 'http://192.168.68.109:8100/'
//};

 // CLOUD DATA TEST ENVIRONMENT
 export const environment = {
    appVersion: "v-1.0.22.12.12",
    production: true,
     serverUrl: "https://www.dxrreleases.com/web",
     SOCKET_ENDPOINT: 'https://www.dxrreleases.com/socket',
     MOBILE_APP_BASE_URL: 'https://dxr-mob-app.web.app/'
 };

// // TEST ENVIRONMENT
// export const environment = {
//     appVersion: "v-1.0.22.12.12",
//     production: true,
//     serverUrl: "http://localhost:9000/web",
//     SOCKET_ENDPOINT: 'http://localhost:9000/socket',
//     MOBILE_APP_BASE_URL: 'http://localhost:8100/'
// };


// ng build --configuration=production --aot --vendor-chunk --common-chunk --delete-output-path --build-optimizer
