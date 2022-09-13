import { Autocomplete, Button, Card, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";
import axios from "axios";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background",
  boxShadow: 24,
  p: 4,
};
export default function Forums() {
  const handleOpen = () => setOpen(true);
  const handleModalOpen = () => setmodal(true);
  const [open, setOpen] = useState(false);
  const [modal, setmodal] = useState(false);
  const [cat, setCat] = useState([]);
  const [img, setImg] = useState("");
  const [text1, setText] = useState("");
  const [name, setName] = useState("");
  const forumsRef = collection(db, "forums");
  const stagessCollectionRef = collection(db, "stagesoflife");
  const [loading, setloading] = useState(false);
  const [forum, setforum] = useState([]);
  const [cato, setcato] = useState([]);
  const { id } = useParams();

  const handleAdd = async () => {
    await addDoc(forumsRef, {
      image: img,
      name: name,
      desc: text1,
      cat: cat,
      categoryID: id,
    });
    setImg("");
    setName("");
    setText("");
    setCat("");
    getforums();
  };
  const getC = async () => {
    const querySnapshot = await getDocs(stagessCollectionRef);
    const datas = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    let backGroundImage = datas.find((doc) => doc.id === id).art;
    setImg(backGroundImage);
  };

  const getforums = async () => {
    const q = query(collection(db, "forums"), where("categoryID", "==", id));
    const querySnapshot = await getDocs(q);
    const datas = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setforum(datas);
  };

  const handleDelete = async (id) => {
    const forumsDoc = doc(db, "forums", id);
    await deleteDoc(forumsDoc);
    getforums();
  };

  useEffect(() => {
    getC();
    getforums();
  }, []);

  const handleClose = () => setOpen(false);
  const handleModal = () => setmodal(false);
  return (
    <div style={{ padding: 50 }}>
      <div className="row" style={{ marginBottom: 15 }}>
        <h1 style={{ textAlign: "center" }}>
          <b>{id}</b>
        </h1>
        <div className="d-flex justify-content-end">
          <Button
            variant="contained"
            style={{
              backgroundColor: "#65350f",
              marginBottom: 30,
              marginTop: 30,
            }}
            onClick={handleOpen}
          >
            Add Forums
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h5 style={{ textAlign: "center", marginBottom: 15 }}>
            Add New Forum
          </h5>
          <label className="mb-2">
            <b>Upload Image</b>
          </label>
          <input
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
          ></input>
          <TextField
            className="my-4"
            size="small"
            fullWidth
            id="outlined-basic"
            label="Name"
            value={name}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <label>
            <b>Description</b>
          </label>
          <textarea
            rows="4"
            cols="50"
            onChange={(e) => setText(e.target.value)}
            value={text1}
          ></textarea>
          <Button
            style={{ backgroundColor: "brown", float: "right" }}
            variant="contained"
            size="small"
            onClick={handleAdd}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      <div className="row">
        {forum.map((val, ind) => 

            <div key={ind} className="col-md-6">
              <Card     style={{ padding: 30, marginBottom: 20 }}>
                <div>
                  <h4 onClick={handleModalOpen}> {val.name}</h4>
                  <p>{val.desc}</p>
                  <Button
                    style={{
                      backgroundColor: "#65350f",
                      marginLeft: 15,
                      float: "right",
                    }}
                    variant="contained"
                    size="small"
                 
                  >
                    Edit
                  </Button>
                  <Modal
                    open={modal}
                    onClose={handleModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div>
                        <img src={val.image} />
                        <h4> {val.name}</h4>
                        <p>{val.desc}</p>
                      </div>
                    </Box>
                  </Modal>
                  <Button
                    style={{ backgroundColor: "#65350f", float: "right" }}
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleDelete(val.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
        )}
      </div>
    </div>
  );
}
