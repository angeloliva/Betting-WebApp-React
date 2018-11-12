import { Validator } from "./Validator"

export const EmailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Checks if a string is a valid email (through a regexp)
export const emailFormat: Validator<string> = email =>
  EmailRegexp.test(email) ? null : "Invalid email"
