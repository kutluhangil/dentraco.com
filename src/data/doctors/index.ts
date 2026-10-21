import { dentarisDoctors } from "./dentaris";
import { kavisDoctors } from "./kavis";
import { kokyapiDoctors } from "./kokyapi";
import { korfezDoctors } from "./korfez";
import { laraDoctors } from "./lara";
import { mineDoctors } from "./mine";
import { porsukDoctors } from "./porsuk";
import { sedefDoctors } from "./sedef";

export const doctors = [
  ...mineDoctors,
  ...dentarisDoctors,
  ...kokyapiDoctors,
  ...korfezDoctors,
  ...kavisDoctors,
  ...laraDoctors,
  ...porsukDoctors,
  ...sedefDoctors,
];
