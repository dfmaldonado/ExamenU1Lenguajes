import * as Yup from 'yup'
import { RoleModel } from "../../core/models/role.model";

export const roleInitialValues: RoleModel = {
    name: "",
    description: "",
};

export const roleValidationsSchema: Yup.ObjectSchema<RoleModel> =
    Yup.object({
        name: Yup.string()
            .required("El nombre es requerido")
            .min(3, "El nombre debe tener al menos 3 caracteres.")
            .max(100, "El nombre debe tener menos de 100 caracteres"),
        description: Yup.string()
            .required("La descripción del rol es requerida.")
            .length(15, "No añadir mas de 15 caracteres a su descripción"),
    });