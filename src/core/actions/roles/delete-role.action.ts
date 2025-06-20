import { AxiosError } from "axios";
import { ApiResponse } from "../../../infraestructure/interfaces/api.response";
import { ApiErrorResponse } from "../../../infraestructure/interfaces/api-error.response";
import { personsApi } from "../../api/persons.api";
import { RoleResponse } from "../../../infraestructure/interfaces/role.response";
import { RolesResponse } from "../../../infraestructure/interfaces/roles.response";

export const deleteRoleAction = async (
    roleId: string
): Promise<ApiResponse<RoleResponse>> => {

    try {
        const { data } = await personsApi
            .delete<ApiResponse<RolesResponse>>(
                `/roles/${roleId}`,
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