import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "ring-of-fire-a7b18", "appId": "1:1007008226905:web:6cc8d58997a21ae6589b48", "storageBucket": "ring-of-fire-a7b18.appspot.com", "apiKey": "AIzaSyAIYiQ1Z39cBDH2M04cGzShRgX0aKFQCME", "authDomain": "ring-of-fire-a7b18.firebaseapp.com", "messagingSenderId": "1007008226905" }))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};