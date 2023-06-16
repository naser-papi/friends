import { Route, Routes } from "react-router-dom";
import { PageRoutes } from "../models/GeneralTypes";
import HomePage from "../pages/home/HomePage";
import ProfilePage from "../pages/profile/ProfilePage";
import LoginPage from "../pages/login/LoginPage";
import SecureRoute from "../components/container/SecureRoute";
import RegisterPage from "../pages/register/RegisterPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<SecureRoute roles={["User"]} />}>
        <Route path={PageRoutes.ROOT} element={<HomePage />}></Route>
        <Route path={PageRoutes.Home} element={<HomePage />}></Route>
        <Route path={PageRoutes.PROFILE} element={<ProfilePage />}></Route>
      </Route>

      <Route path={PageRoutes.LOGIN} element={<LoginPage />}></Route>
      <Route path={PageRoutes.REGISTER} element={<RegisterPage />}></Route>
    </Routes>
  );
};

export default AppRoutes;
