import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Register from "./pages/register";
import SingUp from "./pages/singup";
import AuthContextProvider from "./context/AuthContext";
import AppTaps from "./apptaps";
import Menu from "./components/Menu.js/Menu";
//import AppTaps from './apptaps';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
  <AuthContextProvider>
   <IonReactRouter>
    <IonRouterOutlet >

      <Route exact path="/register">
       <Register />
      </Route>
      <Route exact path="/login">
       <SingUp />
      </Route>   
      <Route path="/my-recipe">
      <Menu />
        <AppTaps />
        
      </Route>
      <Route exact path="/" >
        <Redirect to="/my-recipe/home" />
      </Route>
    </IonRouterOutlet>
   </IonReactRouter>
  </AuthContextProvider>
</IonApp>
);

export default App;
