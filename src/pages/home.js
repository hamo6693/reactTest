import {
  IonAvatar,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import "../styles/home.css";
import {
  personCircle,
} from "ionicons/icons";
import axios from "../config/axios";
import { AuthContext } from "../context/AuthContext";
import {  GET_ALL_POST } from "../config/urls";
import Like from "../components/Like";
import GetComment from "../components/GetComments";


import Test from "../components/test";
import CreatePost from "./createpost";

const Home = (props) => {

    const [posts,setPosts] = useState("")
    const [showLoading, setShowLoading] = useState(false);
    const [newComment,setNewComment] = useState()
    const [countComment, setCountComment] = useState("");



    const {jwt} = useContext(AuthContext)

    useEffect(() => {
        getAllPost()
    },[])

    
   

    const getAllPost = async () => {
        setShowLoading(true);

        try {
            await axios.get(GET_ALL_POST,{
                headers:{
                    Authorization:jwt
                }
            }).then(res => {
              console.log(res.data);
              
            setPosts(res.data)
            setShowLoading(false);
                
                
            })
        } catch (e) {
            console.log(e)
            setShowLoading(false);

        }
    }
  
  return (
    <IonPage>
    {showLoading ? (
      <IonLoading isOpen={showLoading} duration={1000} />
    ) : (
      posts && (
        <>
        <IonToolbar>
          <Header headerTitle="الرئيسية" />
           
          </IonToolbar>
          <IonContent className="ion-padding">
          
            <IonGrid>
           
              <IonRow>
                {posts.length > 0 ? (
                  posts
                   
                    .map((post) => {
                      return (
                        
                        <IonCol sizeLg="6" offsetLg="3" sizeMd="6" size="12" key={post.id}>
                          
                          <IonCard>
                            <IonHeader>
                         
                            <IonGrid>
                             
                                <IonRow>
                               
                                  <IonAvatar className="post-avatar">
                                    {post.User.img_uri ? (
                                      <IonImg src={post.User.img_uri} />
                                    ) : (
                                      <IonImg src={personCircle} />
                                    )}
                                    
                                  </IonAvatar>
                                  <IonLabel className="post-user" style={{margin:"10px"}}>
                                    
                                      {post.User.name}
                                    </IonLabel>
                                 
                                  <IonCol>
                                   
                                   
                                  </IonCol>
                                </IonRow>
                                <div style={{marginLeft:"13px"}}>
                                <IonCardTitle
                                  color="primary"
                                  className="post-title mr-5"
                                >
                                  {post.title}
                                </IonCardTitle>
                                <IonCardSubtitle className="post-contents">
                                  {post.description}
                                </IonCardSubtitle>
                                </div>
                               
                              </IonGrid>
                            </IonHeader>
                            <IonImg
                              src={post.Post_Images[0].img_uri}
                              className="post-image"
                            />

                            <IonRow>
                            <Like postId={post.id} />
                            
                            </IonRow>
                            
                           

                            <IonRow>
                            <IonCol>
                            <GetComment postId={post.id} sendToParent={setCountComment}   />
                            </IonCol>
                            </IonRow>
                            <IonRow>
                            <IonItemDivider color="light">
                      <IonText color="primary">
                        <h3>اكتب تعليق</h3>
                      </IonText>
                    </IonItemDivider>

                            <Test postId={post.id}  SendToParent={setNewComment}/>

                            </IonRow>

                          

                          </IonCard>
                        </IonCol>
                      );
                    })
                ) : (
                  <IonCol sizeMd="6" offsetMd="3">
                    <IonCard className="ion-padding ion-text-center">
                      <IonCardTitle color="primary">
                        لا يوجد منشور لعرضه
                      </IonCardTitle>
                    </IonCard>
                  </IonCol>
                )}
              </IonRow>
            </IonGrid>

          
          </IonContent>
        </>
      )
    )}
  </IonPage>
  );
};
export default Home;
