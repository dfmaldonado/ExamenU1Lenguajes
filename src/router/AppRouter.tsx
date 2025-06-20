import { Route, Routes } from "react-router"
import { Navbar } from "../presentation/components/layout/NavBar"
import { HomePage } from "../presentation/pages/home/HomePage"
import { CountriesPage } from "../presentation/pages/countries/CountriesPage"
import { PersonsPage } from "../presentation/pages/persons/PersonsPage"
import { CreateCountryPage } from "../presentation/pages/countries/CreateCountryPage"
import { EditCountryPage } from "../presentation/pages/countries/EditCountryPage"
import { DeleteCountryPage } from "../presentation/pages/countries/DeleteCountryPage"

export const AppRouter = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Routes>
                <Route element={<Navbar />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/countries" element={<CountriesPage />} />
                    <Route path="/countries/create" element={<CreateCountryPage />} />
                    <Route path="/countries/:countryId/edit" element={<EditCountryPage />} />
                    <Route path="/countries/:countryId/delete" element={<DeleteCountryPage />} />
                    <Route path="/persons" element={<PersonsPage />} />
                </Route>
            </Routes>
        </div>
    )
}