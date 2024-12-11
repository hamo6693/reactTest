import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonAvatar,

  IonLabel,

  IonRow,
  IonCol,
  IonImg,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonText,
  IonItemDivider,
  IonButton,
  useIonActionSheet,
  IonAlert,
  IonIcon,
  IonButtons,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "../config/axios";
import { DELETE_URL, GET_MY_POST_URL } from "../config/urls";
import Header from "../components/Header/Header";
import Like from "../components/Like";
import { ellipsisVerticalCircle, ellipsisVerticalCircleOutline,logoAndroid,personCircle } from "ionicons/icons";
import GetComment from "../components/GetComments";
import Test from "../components/test";
import { useHistory, useParams } from "react-router";

const MyPost = () => {
  const [posts, setPosts] = useState("");
  const [showAlert, setShowAlert] = useState();

  const [postId, setPostId] = useState();

  const [countComment, setCountComment] = useState("");
  const [newComment,setNewComment] = useState()
  const history = useHistory();

  const [present, dismiss] = useIonActionSheet();


  const { jwt } = useContext(AuthContext);


  useEffect(() => {
    
    getMyPost();
    
  }, []);

  const deletePost = async () => {
    try {
      await axios
        .delete(DELETE_URL, {
          data: {
            postId: postId,
          },
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          console.log(res);
          getMyPost();
        });
    } catch (e) {
      console.log(e.response);
    }
  };

  const getMyPost = async () => {
    try {
      await axios
        .get(GET_MY_POST_URL, {
          headers: {
            authorization: jwt,
          },
        })
        .then((res) => {
          console.log(res);
          setPosts(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <IonPage>
      <IonToolbar>
        <Header headerTitle="نتشوراتي" />
      </IonToolbar>
      <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => {
                setShowAlert(false);
              }}
              header={"تنبيه"}
              message={"هل تريد حذف المنشور"}
              buttons={[
                {
                  text: "نعم",
                  handler: () => {
                    deletePost();
                  },
                },
                {
                  text: "الغاء",
                  role: "cancel",
                },
              ]}
            />
      <IonContent>
        
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <IonCol sizeMd="12" size="6" key={post.id}>
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
                        <IonLabel
                          className="post-user"
                          style={{ margin: "10px" }}
                        >
                          {post.User.name}
                        </IonLabel>

                        <IonCol></IonCol>
                      </IonRow>
                      <div style={{ marginLeft: "13px" }}>
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
                            <IonButtons
                                        onClick={() => {
                                          present(
                                            [
                                              {
                                                text: "تعديل المنشور",
                                                handler: () => {
                                                  history.push(
                                                    `/my-recipe/my-post/${post.id}`                                                  );
                                                },
                                              },
                                              
                                              {
                                                text: "حذف المنشور",
                                                handler: () => {
                                                  setPostId(post.id);
                                                  setShowAlert(true);
                                                },
                                              },
                                              {
                                                text: "الغاء",
                                                role: "cancel",
                                              },
                                            ],
                                            "تفاصيل المنشور"
                                          );
                                        }}
                                      >
                                        <IonIcon
                                          icon={logoAndroid}
                                        />
                                      </IonButtons>
                            </IonRow>

                            
                </IonCard>
              </IonCol>
            );
          })
        ) : (
          <h1>g</h1>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MyPost;
