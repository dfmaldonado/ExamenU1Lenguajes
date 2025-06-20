import { AxiosError } from "axios";
import { ApiResponse } from "../../../infraestructure/interfaces/api.response";
import { CountryResponse } from "../../../infraestructure/interfaces/country.response";
import { CountryModel } from "../../models/country.model";
import { ApiErrorResponse } from "../../../infraestructure/interfaces/api-error.response";
import { personsApi } from "../../api/persons.api";

export const editCountryAction = async (
    country: CountryModel, countryId: string
): Promise<ApiResponse<CountryResponse>> => {

    try {

        const { data } = await personsApi
            .put<ApiResponse<CountryResponse>>(
                `/countries/${countryId}`,
                country
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