import * as yup from "yup";

export const signupSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email requerido"),
    password: yup.string().min(6, "Mínimo 6 caracteres").required("Password requerido"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
        .required("Confirmación requerida"),
});