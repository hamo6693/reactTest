import React, { useContext, useState } from "react";
import {
  IonCol,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonButton,
  IonRouterLink,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import "../styles/login.css";
import axios from "../config/axios";
import { LOGIN_URI } from "../config/urls";
import { useHistory } from "react-router";
import { Storage } from "@capacitor/storage";
import { AuthContext } from "../context/AuthContext";

const SingUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { setLoggedIn, setJwt } = useContext(AuthContext);

  const history = useHistory();

  const onSubmit = async () => {
    setShowLoading(true);
    const loginForm = {
      email,
      password,
    };
    try {
      await axios.post(LOGIN_URI, loginForm).then((res) => {
        Storage.set({
          key: "accessToken",
          value: res.data.accessToken,
        });
        setLoggedIn(true);
        setJwt(res.data.accessToken);
        history.push("/my-recipe/home");
        console.log(res);
        console.log(setLoggedIn);

        setShowLoading(false);
      });
    } catch (e) {
      console.log(e);
      setShowLoading(true);
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      {showLoading ? (
        <IonLoading isOpen={showLoading} duration={1000} />
      ) : (
        <>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => {
              setShowAlert(false);
            }}
            header="تنبيه"
            message="الرجاء التاكد من المعلومات المدخله"
            buttons={[
              {
                text: "موافق",
                rule: "ok",
              },
            ]}
          />
          <IonContent className="bg-color">
            <IonCol>
              <IonCard className="card">
                <IonCardHeader>
                  <IonCardTitle
                    color="secondary"
                    className="ion-margin-top ion-text-center"
                  >
                    Login
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonInput
                        name="Email"
                        value={email}
                        onIonChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        label="Email"
                        labelPlacement="stacked"
                      />
                    </IonItem>

                    <IonItem>
                      <IonInput
                        label="password"
                        labelPlacement="stacked"
                        name="password"
                        value={password}
                        onIonChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        type="password"
                      />
                    </IonItem>
                  </IonList>

                  <div className="btn ion-text-center">
                    <IonButton
                      onClick={() => onSubmit()}
                      type="submit"
                      color="secondary"
                    >
                      تسجيل الدخول{" "}
                    </IonButton>
                  </div>
                  <div className="btn ion-text-center">
                    <IonRouterLink
                      routerLink="/register"
                      fill="clear"
                      color="primary"
                    >
                      هل تريد تسجيل حساب جديد؟
                    </IonRouterLink>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonContent>
        </>
      )}
    </IonPage>
  );
};
export default SingUp;
