import { AxiosError } from "axios";
import { ApiResponse } from "../../../infraestructure/interfaces/api.response";
import { ApiErrorResponse } from "../../../infraestructure/interfaces/api-error.response";
import { personsApi } from "../../api/persons.api";
import { OneRoleResponse } from "../../../infraestructure/interfaces/one-role.response";

export const getOneRoleAction = async (roleId: string):
    Promise<ApiResponse<OneRoleResponse>> => {

    try {

        const { data } = await personsApi
        .get<ApiResponse<OneRoleResponse>>(`/roles/${roleId}`);

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