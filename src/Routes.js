import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact={true}
            path="/"
            render={(e, props) => <UserForm {...e} data={props} />}
          />
          <Route
            exact={true}
            path="/view"
            render={(e, props) => <UserTable {...e} data={props} />}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routes;
