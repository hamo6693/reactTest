import React from "react"
import { IonContent, IonHeader, IonMenu, IonTitle, IonList, IonItem, IonToolbar, IonLabel, IonIcon, IonAvatar, IonImg, IonText, IonLoading } from "@ionic/react"
import {personCircleOutline, clipboardOutline, logOutOutline} from 'ionicons/icons'


const Menu = () => {

    return(
        <IonMenu  contentId="menu">
       
        <IonHeader>
            <IonToolbar>
                <IonTitle>قائمة</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonAvatar className="avatar">
                
              
            </IonAvatar>
            <div className="ion-text-center ion-margin-top">
                <IonText color="warning">
                </IonText>
            </div>
            <IonList>
                <IonItem routerLink="/my-recipe/profile">
                    <IonIcon color="primary" icon={personCircleOutline} />
                    <IonLabel className="ion-margin">الصفحة الشخصية</IonLabel>
                </IonItem>
                <IonItem routerLink="/my-recipe/my-post">
                    <IonIcon color="primary" icon={clipboardOutline} />
                    <IonLabel className="ion-margin">منشوراتي</IonLabel>
                </IonItem>
                <IonItem>
                    <IonIcon color="primary" icon={logOutOutline} />
                    <IonLabel className="ion-margin">تسجيل الخروج</IonLabel>
                </IonItem>
            </IonList>
        </IonContent>
    
        
    </IonMenu>
    )
}

export default Menu