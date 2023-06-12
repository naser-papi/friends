import React, { createContext, useContext, useState } from "react";
import { ILayoutContext, ILayoutProvider } from "../models/FormTypes";
import { useSelector } from "react-redux";
import { Drawer } from "@mui/material";
import { IAction, IAppState } from "../models/GeneralTypes";
import BriefInfoBox from "./BriefInfoBox";

const LayoutContext = createContext({} as ILayoutContext);

export const useLayouContext = () => useContext(LayoutContext);

const LayoutProvider: React.FC<ILayoutProvider> = ({ children }) => {
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const { userInfo } = useSelector((state: IAppState) => state.general);

  const toggleBriefInfo = () => setIsBriefOpen(!isBriefOpen);
  const doBriefInfoAction = (action: IAction<object>) => {};
  return (
    <LayoutContext.Provider value={{ toggleBriefInfo, doBriefInfoAction }}>
      {children}
      <Drawer anchor={"left"} open={isBriefOpen} onClose={toggleBriefInfo}>
        <BriefInfoBox {...userInfo} />
      </Drawer>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
