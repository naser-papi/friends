import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useCallApi from "../../hooks/useCallApi";
import { UserRegisterType } from "../../models/UserTypes";
import { IApiCallConfig, IAppState, IUserInfo, PageRoutes } from "../../models/GeneralTypes";
import { doLogin, showNotify } from "../../state/generalSlice";

function useRegisterService() {
  const [callSubmitApi, callStatus] = useCallApi();
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
    dispatch(showNotify({ message: "New User registered", type: "success" }));
    dispatch(doLogin(data));
  };
  const callRegisterService = (data: UserRegisterType) => {
    // we can do validation
    const config: IApiCallConfig = {
      method: "POST",
      url: "auth/register",
      noToken: true,
      validate: validate,
      successHandler: successHandler
    };

    callSubmitApi(config);
  };

  return [callRegisterService, callStatus];
}

export default useRegisterService;
