import {
  IonButtons,
  IonCol,
  IonIcon,
  IonRow,
  IonCardSubtitle,
} from "@ionic/react";
import { heartOutline, heart } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import axios from "../config/axios";
import { GET_LIKE } from "../config/urls";
import { AuthContext } from "../context/AuthContext";
import React from "react";

const Like = (props) => {
  const [likeCount, setLikeCount] = useState();
  const [userLiked, setUserLiked] = useState();
  const [refreshLike, setRefeshLike] = useState();

  const { jwt } = useContext(AuthContext);

  const postId = props.postId;

  useEffect(() => {
    getLikes();
  }, [likeCount, refreshLike]);


  const getLikes = async () => {
    try {
      await axios
        .get(GET_LIKE + "/" + postId, {
          headers: {
            Authorization: jwt,
          },
        })
        .then((res) => {
          console.log(res.data);
          setLikeCount(res.data.likes);
          setUserLiked(res.data.userLike);
        });
    } catch (e) {
      console.log(e.response);
    }
  };

  const like = async () => {
    try {
      await axios
        .put(
          GET_LIKE + "/" + postId,
          {},
          {
            headers: {
              Authorization: jwt,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setRefeshLike(res.data);
        });
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <IonCol size="2">
      <IonButtons
        onClick={(e) => {
          like();
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {userLiked ? (
          <IonIcon icon={heart} color="danger" className="post-icon" />
        ) : (
          <IonIcon icon={heartOutline} color="primary" className="post-icon" />
        )}
      </IonButtons>
      <IonRow>
        <IonCardSubtitle className="post-like">
          {likeCount} likes
        </IonCardSubtitle>
      </IonRow>
    </IonCol>
  );
};

export default Like;
