import { AxiosError } from "axios";
import { ApiResponse } from "../../../infraestructure/interfaces/api.response";
import { Statistics } from "../../../infraestructure/interfaces/statistics.response";
import { personsApi } from "../../api/persons.api";
import { ApiErrorResponse } from "../../../infraestructure/interfaces/api-error.response";

export const countsAction = async (): Promise<ApiResponse<Statistics>> => {
  try {
    const { data } = await personsApi.get<ApiResponse<Statistics>>("/statistics/counts");

    return data;

  } catch (error) {
    const apiError = error as AxiosError<ApiErrorResponse>;
    console.error(apiError);
    
    if (apiError.response) {
        throw new Error (apiError.response.data.message);
    } else if(apiError.request){
        throw new Error ("Error de conexión")
    } else {
      throw new Error ("Error desconocido.")
    }
 
  }
}