import Yup from "yup";
export const addProductValidationSchema = Yup.object({
  name: Yup.string().required("name is required").trim().max(65),
  price: Yup.number()
    .required("price is required")
    .min(0, "price cannot be negative"),
  quantity: Yup.number()
    .required("quantity must be required")
    .min(1, "quantity must be at least 1"),
});
