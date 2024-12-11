import axios from "../config/axios";
import React, { useContext, useEffect, useState } from "react";
import { COMMENT_URL } from "../config/urls";
import { AuthContext } from "../context/AuthContext";
import {
  IonAvatar,
  IonCard,
  IonCardSubtitle,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
  IonCol,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import avatar from "../avatar.png";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { chatboxEllipsesOutline } from "ionicons/icons";

import "../styles/getComment.css";

const GetComment = (props) => {


 
  const [comments, setComments] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [countComment, setCountComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { jwt } = useContext(AuthContext);

  const postId = props.postId;



 


  const setCountComments = () => {
    props.sendToParent(countComment);
  };

 

  useEffect(() => {   
    getComment()
    setCountComments();

  }, [countComment]);



  const getComment = async () => {
    setShowLoading(true);
    try {
      await axios
        .get(COMMENT_URL + "/" + postId, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          console.log(res);
          setComments(res.data.comment);
          setCountComment(res.data.comment.length);
          setShowLoading(false);
        });
    } catch (e) {
      console.log(e);
      setShowLoading(false);
    }
  };



 


  return (
    <IonGrid className="ion-no-margin">
          
      <IonCol size="3" class="mr-4">
        <div style={{ position: "relative" }}>
          <button className="btn-edit" onClick={() => setIsOpen(true)}>
            <IonIcon icon={chatboxEllipsesOutline} />
            <IonCardSubtitle className="comment-edit">
              {countComment} comments
            </IonCardSubtitle>
          </button>
        </div>
      </IonCol>
      <IonModal isOpen={isOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>comments</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {comments &&
            comments.map((comment) => {
              return (
                <>
                  <IonRow key={comment.id}>
                    <IonAvatar className="comment-avatar">
                      <IonImg src={avatar} />
                    </IonAvatar>

                    <IonCard className="comment-card ion-padding">
                      <IonCardSubtitle color="warning">
                        {comment.length}
                      </IonCardSubtitle>

                      <IonCardSubtitle color="warning">
                        {comment.User.name}
                      </IonCardSubtitle>

                      <IonText className="comment-text">{comment.text}</IonText>
                    </IonCard>
                  </IonRow>
                </>
              );
            })}
        </IonContent>
      </IonModal>
    </IonGrid>
  );

  
};



export default GetComment;
