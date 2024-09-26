import { yupToFormErrors } from "formik";
import * as Yup from "yup";

export const FormSceme = Yup.object({
  name: Yup.string()
    .min(3, "Please enter atleats 3 letter")
    .max(10)
    .required("Name Is Required"),

  email: Yup.string().email().required("Email is Required"),
});
