import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import MainLayout from "./MainLayout";
import { IBasePage } from "../models/GeneralTypes";

export const withBasePage = (Component, title: string) => {
  return (props) => {
    const [pageTitle, setPageTitle] = useState(title);
    useEffect(() => {
      setPageTitle(title);
    }, [title]);
    return (
      <>
        <Helmet>
          <title data-cy={"page-title"}>{pageTitle ? pageTitle : "-"}</title>
        </Helmet>
        <MainLayout pageTitle={title}>
          <Component {...props} />
        </MainLayout>
      </>
    );
  };
};

export const BasePage: React.FC<IBasePage> = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title data-cy={"page-title"}>{title ? title : "-"}</title>
      </Helmet>
      <MainLayout pageTitle={title}>{children}</MainLayout>
    </>
  );
};
