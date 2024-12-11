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
  IonText,
  IonRouterLink,
} from "@ionic/react";
import React from "react";
import "../styles/login.css";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "../config/axios";
import { REGISTER_URI } from "../config/urls";
import { useHistory } from "react-router";

const Register = () => {
  const history = useHistory()


  const validationSchema = yup.object({
    name: yup.string().nullable().required("اسم المستخدم مطلوب"),

    email: yup
      .string()
      .nullable()
      .email("يجب ادخال البريد الالكتروني الصحيح")
      .required("البريد الالكتروني مطلوب"),

    password: yup
      .string()
      .nullable()
      .min(5, "less 5 letter")
      .required("يجب ادخال كلمة المرور"),
  });

  const onSubmit = async (values) => {
    try {
      await axios.post(REGISTER_URI, values).then(res => {
        console.log(res);
        history.push("/login")
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <IonPage>
      <IonContent className="bg-color">
        <IonCol>
          <IonCard className="card">
            <IonCardHeader>
              <IonCardTitle
                color="secondary"
                className="ion-margin-top ion-text-center"
              >
                register
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <Formik
                initialValues={{
                  name: null,
                  email: null,
                  password: null,
                }}

                
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  onSubmit(values);
                  resetForm({ values: "" });
                }}
              >
                {(formikProps) => (
                  <form onSubmit={formikProps.handleSubmit}>
                    <IonList>
                      <IonItem>
                        <IonLabel position="floating" color="secondary">
                          الاسم
                        </IonLabel>
                        <IonInput
                          name="name"
                          value={formikProps.values.name}
                          onIonChange={formikProps.handleChange}
                        />
                      </IonItem>
                      <IonText className="error">
                        {formikProps.touched.name && formikProps.errors.name}
                      </IonText>

                      <IonItem>
                        <IonLabel position="floating" color="secondary">
                          البريد الالكتروني
                        </IonLabel>
                        <IonInput
                          name="email"
                          value={formikProps.values.email}
                          onIonChange={formikProps.handleChange}
                        />
                      </IonItem>
                      <IonText className="error">
                        {formikProps.touched.email && formikProps.errors.email}
                      </IonText>

                      <IonItem>
                        <IonLabel position="floating" color="secondary">
                          كلمة المرور
                        </IonLabel>
                        <IonInput
                          name="password"
                          value={formikProps.values.password}
                          onIonChange={formikProps.handleChange}
                          type="password"
                        />
                      </IonItem>
                      <IonText className="error">
                        {formikProps.touched.password &&
                          formikProps.errors.password}
                      </IonText>
                    </IonList>
                    <div className="btn ion-text-center">
                      <IonButton type="submit" color="secondary">
                        تسجيل حساب جديد
                      </IonButton>

                    </div>
                    <div className="btn ion-text-center ion-margin-top">
                    <IonRouterLink routerLink="/login" className="router-link d-block" color="light">تسجل الدخول</IonRouterLink>
                    </div>
                  </form>
                )}
              </Formik>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default Register;
