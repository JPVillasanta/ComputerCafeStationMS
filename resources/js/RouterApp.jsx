import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import AppLayout from "./Components/AppLayout";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import StationList from "./Pages/Stations/Index";
import AddStation from "./Pages/Stations/Create";
import StationDetails from "./Pages/Stations/Show";

export default function RouterApp() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="/" element={<Home />} />

                <Route path="/stations" element={<StationList />} />

                <Route path="/stations/create" element={<AddStation />} />

                <Route path="/stations/:station" element={<StationDetails />} />
            </Route>
        </Routes>
    );
}
