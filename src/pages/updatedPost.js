/*
import React, { useContext, useEffect, useState } from "react";
import {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonText,
    IonTextarea,
    IonTitle,
    IonGrid,
    IonItem,
    IonList,
    IonRow,
    IonCol,
    IonLabel,
    IonInput

  } from "@ionic/react";

import Header from '../components/Header/Header';
import Menu from "../components/Menu.js/Menu";
import axios from "../config/axios";
import { DELETE_URL, GET_MY_POST_URL } from "../config/urls";
import { AuthContext } from "../context/AuthContext";



const UpdatedPost =  () => {

  const postId = window.location.pathname.split("/")[3];
  console.log(postId);
  


  const [posts,setPosts] = useState();
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  

  const {jwt} = useContext(AuthContext)

  useEffect(() => {
    getPost()
  },[])

 const getPost = async (PostId) => {

  try {
    await axios.get(GET_MY_POST_URL + "/" + PostId,{
      headers:{
        Authorization:jwt
      }
    }).then(res => {
      console.log(res.data);
      setTitle(res.data[0].title)
      setDescription(res.data[0].description);
      
    })
    
  } catch (e) {
    console.log(e);
    
  }
 }
    return(
     
        <IonPage>
        <Header headerTitle="نتشوراتي" />
        <IonContent className="ion-padding">
            <IonGrid>
                <IonRow>

                <IonCol sizeMd="7" offsetLg="3">
                    <IonList>
                        <IonItem>
                        <IonLabel position="floating" color="warning">
                      العنوان
                    </IonLabel>
                    <IonInput
                    value={title}
                    onIonChange={(e) => setTitle(e.target.value)}
                    />
                        </IonItem>

                        <IonItem>
                        <IonLabel position="floating" color="warning">
                      التفاصيل
                    </IonLabel>
                    <IonTextarea
                    value={description}
                    />
                        </IonItem>

                        <div className="btn">
                    <IonButton expand="block">تعديل المنشور</IonButton>
                  </div>
                    </IonList>
                </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
      
    )
}
export default UpdatedPost
*/