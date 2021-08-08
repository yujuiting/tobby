/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />
/// <reference types="firebase" />

declare interface Window {
  recaptchaVerifier?: firebase.default.auth.RecaptchaVerifier;
}
