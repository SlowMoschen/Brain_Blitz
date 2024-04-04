import React, { Dispatch, SetStateAction } from "react";

/**
 * @description Resets the form and sets the state to an empty string.
 * @param e The form event.
 * @param stateSetters An array of state setters.
 * @returns void
 * @example formResetter(e, [setName, setEmail, setMessage]);
 */
export function formResetter<T>(
  e: React.FormEvent<HTMLFormElement>,
  stateSetters: Dispatch<SetStateAction<T>>[]
): void {
  e.preventDefault();
  stateSetters.forEach((setter) => setter("" as T));
  e.currentTarget.reset();
}
