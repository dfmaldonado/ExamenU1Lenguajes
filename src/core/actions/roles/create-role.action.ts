import { AxiosError } from "axios";
import { ApiResponse } from "../../../infraestructure/interfaces/api.response";
import { ApiErrorResponse } from "../../../infraestructure/interfaces/api-error.response";
import { personsApi } from "../../api/persons.api";
import { RoleResponse } from "../../../infraestructure/interfaces/role.response";
import { RoleModel } from "../../models/role.model";

export const createRoleAction = async (
    role: RoleModel
): Promise<ApiResponse<RoleResponse>> => {

    try {

        const { data } = await personsApi
            .post<ApiResponse<RoleResponse>>(
                "/role",
                role
            );

        return data;

    } catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;

        if (apiError.response) {
            throw new Error(apiError.response.data.message)
        } else if (apiError.request) {
            throw new Error("Error de conexión.")
        } else {
            throw new Error("Error desconocido.")
        }
    }

}