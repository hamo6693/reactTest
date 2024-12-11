import React, { useEffect } from "react";
import {
  IonButtons,
  IonIcon,
  IonItem,
  IonText,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import { send } from "ionicons/icons";
import { useContext, useState } from "react";
import axios from "../config/axios";
import { COMMENT_URL } from "../config/urls";
import { AuthContext } from "../context/AuthContext";

const Test = (props) => {
  const [newComment, setNewComment] = useState();

  const { jwt } = useContext(AuthContext);
  const [showToast, setShowToast] = useState(false);

  const postId = props.postId;

  const onSubmit = async () => {
    const comment = {
      text: newComment,
    };

    if (newComment === null) {
      setShowToast(true);
    }

    try {
      const createComment = await axios
        .post(COMMENT_URL + "/" + postId, comment, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          console.log(res);
          setNewComment("");
        });
    } catch (e) {
      console.log(e);
    }
  };

  const validation = () => {
    if (newComment) {
      onSubmit();
      setNewComment("");

      props.SendToParent(newComment);
    } else {
      setShowToast(true);
    }
  };

  return (
    <>
      <IonItem className="ion-margin-bottom">
        <IonTextarea
          placeholder="leave a message"
          className="ion-margin"
          value={newComment}
          onIonChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        <IonButtons onClick={() => validation()}>
          <IonIcon icon={send} className="send-icon" color="danger" />
        </IonButtons>
      </IonItem>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => {
          setShowToast(false);
        }}
        message="يجب ادخال تعليقك"
        duration={1500}
        color="danger"
      />
    </>
  );
};

export default Test;
