import { createBrowserRouter } from "react-router-dom";
import Layout from "./componets/Layout";
import HomePage from "./pages/HomePage";
import SobrePage from "./pages/SobrePage";
import LoginPage from "./pages/LoginPage";
import AlunosPage from "./pages/AlunosPage";
import MatriculasPage from "./pages/MatriculasPage";
import ReceitasPage from "./pages/ReceitasPage";
import DespesasPage from "./pages/DespesasPage";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage></LoginPage>
    },
    {
        path: "/",
        element: <Layout></Layout>,
        children: [
            {
                path: "/",
                element: <HomePage></HomePage>
            },
            {
                path: "/alunos",
                element: <AlunosPage></AlunosPage>
            },
            {
                path: "/matriculas",
                element: <MatriculasPage></MatriculasPage>
            },
            {
                path: "/receitas",
                element: <ReceitasPage></ReceitasPage>
            },
            {
                path: "/despesas",
                element: <DespesasPage></DespesasPage>
            },
            {
                path: "/sobre",
                element: <SobrePage></SobrePage>
            },
        ],
    },
]);