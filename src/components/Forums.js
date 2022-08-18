import { Autocomplete, Button, Card, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

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
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState([]);
  const [img, setImg] = useState("");
  const [text1, setText] = useState("");
  const [name, setName] = useState("");
  const forumsRef = collection(db, "forums");
  const [loading, setloading] = useState(false);

  const [forums, setforums] = useState([]);

  const handleAdd = async () => {
    await addDoc(forumsRef, {
      name: name,
      image: img,
      desc: text1,
      cat: cat,
    });
    setName("");
    setImg("");
    setText("");
    setCat("");
    getforums();
  };
  const getforums = async () => {
    const data = await getDocs(forumsRef);
    // console.log(data);
    setforums(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const handleDelete = async (id) => {
    const forumsDoc = doc(db, "forums", id);
    await deleteDoc(forumsDoc);
    getforums();
  };

  useEffect(() => {
    getforums();
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <div style={{ padding: 50 }}>
      <div className="row" style={{ marginBottom: 15 }}>
        <h1 style={{ textAlign: "center" }}>
          <b>FORUMS</b>
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
            onChange={(e) => setImg(e.target.value)}
            value={img}
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
          <Autocomplete
            multiple
            className="mb-4"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                onChange={(e) => setCat(e.target.value)}
                value={cat}
                variant="outlined"
                label="Select Categories"
                placeholder="Select Categories"
              />
            )}
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
        {forums.map((forums) => {
          return (
            <div className="col-md-6">
              <Card style={{ padding: 30, marginBottom: 20 }}>
                <div>
                  <img src="{forums.img}"></img>
                  <h4> {forums.name}</h4>
                  <p>{forums.desc}</p>
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
                  <Button
                    style={{ backgroundColor: "#65350f", float: "right" }}
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleDelete(forums.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
