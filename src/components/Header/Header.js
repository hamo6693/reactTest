import React from "react";
import {  IonHeader, IonButtons,IonMenuButton,IonTitle, IonToolbar } from "@ionic/react"
import "../../styles/header.css"

const Header = (props) => {
 return(
    <IonHeader className="list">
    <IonToolbar color="secondary" >
        <IonTitle>{props.headerTitle}</IonTitle>
        <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
    </IonToolbar>
   
</IonHeader>
 )   
}

export default Header