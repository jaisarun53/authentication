import Yup from "yup";

export const addUserValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required.")
    .trim()
    .max(30, "First name must be at max 30 characters,"),
  lastName: Yup.string()
    .required("Last name is required.")
    .trim()
    .max(30, "Last name must be at max 30 characters."),
  email: Yup.string()
    .email("Must be a valid email address.")
    .required("Email is required.")
    .max(60, "Email must be at max 60 characters.")
    .trim()
    .lowercase(),
  password: Yup.string()
    .required("Password is mandatory.")
    .trim()
    .min(4, "Password must be at least 4 characters")
    .max(30, "Password must be at max 30 characters."),
});

export const loginUserValidationSchema = Yup.object({
  email: Yup.string()
    .email("must me valid email address.")
    .required("eamail must be required")
    .trim()
    .lowercase()
    .max(60, "email must be at max 60 character"),
  password: Yup.string().required("password must be required").trim(),
});
