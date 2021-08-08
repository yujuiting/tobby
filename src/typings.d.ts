/// <reference types="firebase" />

declare interface Window {
  recaptchaVerifier?: firebase.default.auth.RecaptchaVerifier;
}
