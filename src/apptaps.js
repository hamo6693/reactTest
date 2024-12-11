import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import Home from "./pages/home";
import { AuthContext } from "./context/AuthContext";
import CreatePost from "./pages/createpost";
import { IonReactRouter } from "@ionic/react-router";
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';


import { addCircle, home } from 'ionicons/icons';
import MyPost from "./pages/myPost";
import UpdatedPost from "./pages/updatedPost";





const AppTaps = () => {
  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn);

  if (!loggedIn) {
    return <Redirect to="/login" />
  } else {
    return (
        <IonTabs>
            <IonRouterOutlet id="menu">
        <Route exact path="/my-recipe/home">
          <Home />
        </Route>

        <Route exact path="/my-recipe/create-post">
          <CreatePost />
        </Route>

        <Route exact path="/my-recipe/my-post">
          <MyPost />
        </Route>

      
        <Route exact path="/my-recipe/my-post/:id">
          <UpdatedPost />
        </Route>

        

      </IonRouterOutlet>
             <IonTabBar slot='bottom'>
            <IonTabButton tab='create-post' href='/my-recipe/create-post'>
                <IonIcon icon={addCircle} />
              <IonLabel>نشر</IonLabel>
            </IonTabButton>

            <IonTabButton tab='all-posts"' href='/my-recipe/home'>
            <IonIcon icon={home} />
              <IonLabel>المنشورات</IonLabel>
            </IonTabButton>

          </IonTabBar>
        </IonTabs>

      

    );
  }
};

export default AppTaps;
