import { URLS } from "../../../../configs/Links";

export const navigationLinks = [
  {
    text: "Startseite",
    to: URLS.HOME,
  },
  {
    text: "Über uns",
    to: URLS.ABOUT,
  },
  {
    text: "F A Q",
    to: URLS.FAQ,
  },
  {
    text: "Mitgliedschaften",
    to: URLS.MEMBERSHIPS,
  },
];

export const accountLinks = [
  {
    text: "Login",
    to: URLS.SIGNIN,
  },
  {
    text: "Registrieren",
    to: URLS.SIGNUP,
  },
  {
    text: "Passwort vergessen",
    to: URLS.FORGOT_PASSWORD,
  },
  {
    text: "Verifizierung erneut senden",
    to: URLS.RESEND_VERIFICATION_EMAIL,
  },
];

export const legalLinks = [
  {
    text: "Impressum",
    to: URLS.IMPRINT,
  },
  {
    text: "Datenschutz",
    to: URLS.PRIVACY,
  },
  {
    text: "AGB",
    to: URLS.TERMS_AND_CONDITIONS,
  },
  {
    text: "Kontakt",
    to: URLS.CONTACT,
  },
];
