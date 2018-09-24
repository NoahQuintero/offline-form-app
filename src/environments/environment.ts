// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyANzFV7-MZp7CF9gU73CEYUL6iDM82asH8',
    authDomain: 'my-things-project.firebaseapp.com',
    databaseURL: 'https://my-things-project.firebaseio.com',
    projectId: 'my-things-project',
    storageBucket: 'my-things-project.appspot.com',
    messagingSenderId: '256605265759'
  }

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
