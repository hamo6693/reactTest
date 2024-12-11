import React from "react";

import {
    IonAlert,
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonImg,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonText,
    IonTextarea,
    IonToast,

   IonButtons, IonModal, IonHeader, IonToolbar, IonTitle 

   
  } from "@ionic/react";
  import { duplicate } from "ionicons/icons";
  import { useContext, useEffect, useRef, useState } from "react";
  import { Swiper, SwiperSlide } from "swiper/react";
  import Header from "../components/Header/Header";
  import { usePhotoGallery } from "../hooks/usePhotoGallery";
  import "../styles/createPost.css";
  import "swiper/css";
  import {Pagination, Navigation, Autoplay} from 'swiper'
  import 'swiper/css/pagination'
  import 'swiper/css/navigation'
  import 'swiper/css'

  import axios from "../config/axios";
  import { CREATE_POST_URI } from "../config/urls";
  import { AuthContext } from "../context/AuthContext";
  import { useHistory } from "react-router";
  
  const CreatePost = () => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const takePhotoRef = useRef();
    const { takePhoto, blobUrl } = usePhotoGallery();
    const [photos, setPhotos] = useState([]);
    const [showImageToast, setShowImageToast] = useState(false);
    const [showContentToast, setShowContentToast] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
  
    const history = useHistory();
  
    const { jwt } = useContext(AuthContext);
  
    const onSubmit = async () => {
      const postData = new FormData();
      try {
        postData.append("title", title);
        postData.append("description", description);
     
        for (let i = 0; i < photos.length; i++) {
          const response = await fetch(photos[i]);
          const blob = await response.blob();
          postData.append("avatar", blob);
        }
        await axios
          .post(CREATE_POST_URI, postData, {
            headers: {
              Authorization: jwt,
            },
          })
          .then((res) => {
            console.log(res);
            setPhotos([]);
            setDescription("");
            setTitle("");
            setShowAlert(true);
          });
      } catch (e) {
        console.log(e.response);
      }
    };
  
    useEffect(() => {
      if (blobUrl) {
        const imgUrls = [blobUrl, ...photos];
        setPhotos(imgUrls);
      }
    }, [blobUrl]);
    
    const swiper_settings = {
        navigation: true,
        pagination: {
            clickable: true
        },
        autoplay: {
            delay: 3000,
        }
    }
  
    const validator = () => {
      if (photos.length > 0) {
        if(title && description) {
          onSubmit();
        }else {
            setShowContentToast(true)
        }
        } else {
        setShowImageToast(true);
      }
    };
  
    return (
      <IonPage>
        <Header headerTitle="نشر منشور" />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="تمت عملية نشر المنشور بنجاح"
          message="لقد تم نشر المنشور يمكنك الانتقال الى صفحة المنشورات"
          buttons={[
            {
              text: "موافق",
              handler: () => {
                history.push("/");
              },
            },
          ]}
        />
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol sizeMd="6" offsetMd="3" sizeLg="4" offsetLg="4">
                <IonList>
                  <IonItem>
                    <IonLabel position="floating" color="secondary">
                      العنوان
                    </IonLabel>
                    <IonInput
                      value={title}
                      onIonChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </IonItem>
  
                  <IonItem className="ion-margin-bottom">
                    <IonLabel position="floating" color="secondary">
                      الوصف
                    </IonLabel>
                    <IonTextarea
                      value={description}
                      onIonChange={(e) => setDescription(e.target.value)}
                    />
                  </IonItem>
                 
                  <IonItem lines="none" ref={takePhotoRef} onClick={takePhoto}>
                    <IonText style={{margin:"0 auto"}} class="ion-padding-bottom" color="secondary">اضغط هنا لاضافة الصور</IonText>
                    
                  </IonItem>
                  
                  <IonItem className="ion-margin-bottom" lines="none">
                    {photos.length > 0 ? (
                      <Swiper {...swiper_settings} modules={[Pagination, Navigation, Autoplay]}>
                        {photos.map((img, index) => {
                          return (
                            <SwiperSlide key={index}>
                              <IonImg
                                src={img}
                                onClick={() => takePhotoRef.current.click()}
                              />
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    ) : (
                      <div className="icon-container">
                        <IonIcon
                          icon={duplicate}
                         color="secondary"
                          className="icon-images"
                          onClick={() => takePhotoRef.current.click()}
                        />
                      </div>
                    )}
                  </IonItem>
  
                    <IonButton
                      expand="block"
                      onClick={validator}
                      className="edit-btn"
                      color="secondary"
                    >
                      نشر
                    </IonButton>
                </IonList>
                <IonToast
                  isOpen={showImageToast}
                  onDidDismiss={() => setShowImageToast(false)}
                  message="يجب ادخال صورة على الاقل"
                  duration={1500}
                  color="danger"
                />
                <IonToast
                  isOpen={showContentToast}
                  onDidDismiss={() => setShowContentToast(false)}
                  message="يجب ادخال جميع الحقول"
                  duration={1500}
                  color="danger"
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default CreatePost;