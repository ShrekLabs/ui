import { ActionBar } from "@gravity-ui/navigation";
import React, { PropsWithChildren } from "react";
import style from "./style.module.scss";

type TProps = PropsWithChildren<{ sidebar?: React.ReactNode; actionBar?: React.ReactNode }>;

export const Layout: React.FC<TProps> = (props) => {
  return (
    <div className={style.layout}>
      {props.sidebar ? <div className={style.sidebar}>{props.sidebar}</div> : null}
      <div className={style.main}>
        {props.actionBar ? renderNavbar(props.actionBar) : null}
        <div className={style.page}>{props.children}</div>
      </div>
    </div>
  );
};

function renderNavbar(content: React.ReactNode) {
  return (
    <div className={style.actionBar}>
      <ActionBar>{content}</ActionBar>
    </div>
  );
}
