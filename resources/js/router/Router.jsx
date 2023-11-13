import Dashboard from "@/Pages/Dashboard";
import React, { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Router