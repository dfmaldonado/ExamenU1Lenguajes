import { AxiosError } from "axios";
import { ApiResponse } from "../../../infraestructure/interfaces/api.response";
import { CountryResponse } from "../../../infraestructure/interfaces/country.response";
import { ApiErrorResponse } from "../../../infraestructure/interfaces/api-error.response";
import { personsApi } from "../../api/persons.api";
import { RoleResponse } from "../../../infraestructure/interfaces/role.response";
import { RoleModel } from "../../models/role.model";

export const editRoleAction = async (
    role: RoleModel, roleId: string
): Promise<ApiResponse<RoleResponse>> => {

    try {

        const { data } = await personsApi
            .put<ApiResponse<CountryResponse>>(
                `/roles/${roleId}`,
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