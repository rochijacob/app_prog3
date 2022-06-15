import * as yup from 'yup';

let LettersSpaces = /^[a-zA-Z\s]*$/;

export const LoginSchema = yup.object().shape({
    email: yup.string()
    .required("Un email es requerido")
    .email("El email ingresado no es valido")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "No debe contener caracteres especiales"
    )
    .required("El campo email es requerido"),
    password: yup.string().required()
    .min(6)
    .max(24),
  })
