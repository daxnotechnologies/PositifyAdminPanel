import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function ImgMediaCard(props) {
  const handleDelete = async (id) => {
    console.log(id);
    const forumsDoc = doc(db, `forum testing/${props.forumId}/Comments`, id);
    await deleteDoc(forumsDoc);
    // const forumsDoc = doc(db, "forum testing", id);
    // await deleteDoc(forumsDoc);
  };
  return (
    <>
      <Card sx={{ marginX: 5, marginY: 10 }}>
        <CardHeader
          avatar={<Avatar>{props.userimage}</Avatar>}
          title={props.Name}
          subheader={props.Time}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.comment}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              handleDelete(props.commentId);
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
