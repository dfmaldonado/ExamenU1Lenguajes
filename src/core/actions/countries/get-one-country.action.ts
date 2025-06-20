import { AxiosError } from "axios";
import { ApiResponse } from "../../../infraestructure/interfaces/api.response";
import { OneCountryResponse } from "../../../infraestructure/interfaces/one-country.response";
import { ApiErrorResponse } from "../../../infraestructure/interfaces/api-error.response";
import { personsApi } from "../../api/persons.api";

export const getOneCountryAction = async (countryId: string):
    Promise<ApiResponse<OneCountryResponse>> => {

    try {

        const { data } = await personsApi
        .get<ApiResponse<OneCountryResponse>>(`/countries/${countryId}`);

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