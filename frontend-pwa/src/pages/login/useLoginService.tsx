import useCallApi from "../../hooks/useCallApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IApiCallConfig, IAppState, IUserInfo, PageRoutes } from "../../models/GeneralTypes";
import { useEffect } from "react";
import { UserRegisterType } from "../../models/UserTypes";
import { doLogin } from "../../state/generalSlice";

function useLoginService() {
  const [callApi, apiState] = useCallApi();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: IAppState) => state.general);
  useEffect(() => {
    if (isLoggedIn) {
      navigate(PageRoutes.Home);
    }
  }, [isLoggedIn]);

  const validate = (data: UserRegisterType) => {
    return Promise.resolve(true);
  };
  const successHandler = (data: IUserInfo) => {
    dispatch(doLogin(data));
  };
  const callLoginService = (data: UserRegisterType) => {
    const config: IApiCallConfig = {
      method: "POST",
      url: "auth/login",
      noToken: true,
      validate: validate,
      successHandler: successHandler
    };

    callApi(config);
  };

  return [callLoginService, apiState];
}

export default useLoginService;
