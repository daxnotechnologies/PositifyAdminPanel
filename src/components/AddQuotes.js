import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
//import { Link, Outlet } from "react-router-dom";
import "./css/styles.css";
//import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
export default function AddQuotes() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState([]);
  const [favUser, setfavUser] = useState([]);

  const [theme, setTheme] = useState("");

  const [ename, seteName] = useState("");
  const [eauthor, seteAuthor] = useState([]);
  const [etheme, seteTheme] = useState("");
  const [eid, seteid] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const quotesRef = collection(db, "Quotes");
  const [quotes, setquotes] = useState([]);
  const stagessCollectionRef = collection(db, "stagesoflife");
  const [stages, setstages] = useState([]);

  const handleAdd = async () => {
    await addDoc(quotesRef, {
      name: name,
      author: author,
      cat: theme,
      fav: favUser,
    });
    setName("");
    setAuthor("");
    setTheme("");
    getquotes();
  };

  const handleUpdate = async () => {
    try {
      console.log("pathhh", eid);
      const frankDocRef = doc(db, "Quotes", eid);
      console.log("frankdocred", frankDocRef);
      await updateDoc(frankDocRef, {
        name: ename,
        author: eauthor,
        cat: etheme,
      })
        .then((res) => {
          console.log("rees", res);
        })
        .catch((err) => {
          console.log("error", err);
        });

      seteName("");
      seteAuthor("");
      seteTheme("");
      getquotes();
      setOpen1(false);
    } catch (err) {}
  };

  const getquotes = async () => {
    const data = await getDocs(quotesRef);
    //console.log(data);
    setquotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getstagesoflife = async () => {
    const data = await getDocs(stagessCollectionRef);
    console.log(data);
    setstages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getquotes();
    getstagesoflife();
  }, []);

  const handleDelete = async (id) => {
    const quoteDoc = doc(db, "Quotes", id);
    await deleteDoc(quoteDoc);
    getquotes();
    //setloading(true);
  };
  return (
    <div>
      <div className="p-4 m-4">
        <h1 style={{ textAlign: "center", marginBottom: 40 }}>
          <b>QUOTES MANAGMENT</b>
        </h1>
        <Button
          variant="contained"
          style={{
            marginLeft: 10,
            float: "right",
            backgroundColor: "#65350f",
            marginBottom: 30,
          }}
          onClick={handleOpen}
        >
          Add Quotes
        </Button>
        <Button
          variant="contained"
          style={{
            float: "right",
            backgroundColor: "#65350f",
            marginBottom: 30,
          }}
          //   onClick={handleOpen}
        >
          Upload Quotes
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h5 style={{ textAlign: "center", marginBottom: 15 }}>
              Add Quotes
            </h5>

            <TextField
              className="my-4"
              size="small"
              required
              fullWidth
              id="outlined-basic"
              label="Quote"
              value={name}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              required
              className="mb-4"
              size="small"
              fullWidth
              id="outlined-basic"
              label="Author"
              value={author}
              variant="outlined"
              onChange={(e) => setAuthor(e.target.value)}
            />

            <FormControl fullWidth className="mb-4">
              <InputLabel id="demo-simple-select-label">
                Set Theme Of Your Quote
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                size="small"
                id="demo-simple-select"
                value={theme}
                label="Theme"
                onChange={(e) => setTheme(e.target.value)}
              >
                {stages.map((stages) => {
                  return <MenuItem value={stages.name}>{stages.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <Button
              style={{
                backgroundColor: "#80471C",
                float: "right",
              }}
              variant="contained"
              size="small"
              onClick={handleAdd}
            >
              Submit
            </Button>
          </Box>
        </Modal>

        <div>
          <table className="table" style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th className="col-1">Quote</th>
                <th className="col-2">Category</th>
                <th className="col-3">Author</th>
                <th className="col-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quotes) => {
                return (
                  <tr>
                    <td>{quotes.name}</td>
                    <td>{quotes.cat}</td>
                    <td>{quotes.author}</td>
                    <td>
                      <>
                        <Button
                          style={{
                            backgroundColor: "#65350f",
                            marginRight: 15,
                          }}
                          variant="contained"
                          size="small"
                          onClick={() => {
                            seteName(quotes.name);
                            seteAuthor(quotes.author);
                            seteTheme(quotes.cat);
                            seteid(quotes.id);
                            handleOpen1();
                            // handleOpenEdit(stage)
                          }}
                        >
                          Edit
                        </Button>

                        <Modal
                          open={open1}
                          onClose={handleClose1}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <h5
                              style={{ textAlign: "center", marginBottom: 15 }}
                            >
                              Edit Quote
                            </h5>

                            <TextField
                              className="my-4"
                              size="small"
                              required
                              fullWidth
                              id="outlined-basic"
                              label="Quote"
                              value={ename}
                              variant="outlined"
                              onChange={(e) => seteName(e.target.value)}
                            />
                            <TextField
                              required
                              className="mb-4"
                              size="small"
                              fullWidth
                              id="outlined-basic"
                              label="Author"
                              value={eauthor}
                              variant="outlined"
                              onChange={(e) => seteAuthor(e.target.value)}
                            />

                            <FormControl fullWidth className="mb-4">
                              <InputLabel id="demo-simple-select-label">
                                Set Theme Of Your Quote
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                size="small"
                                id="demo-simple-select"
                                value={etheme}
                                label="Theme"
                                onChange={(e) => seteTheme(e.target.value)}
                              >
                                {stages.map((stages) => {
                                  return (
                                    <MenuItem value={stages.name}>
                                      {stages.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                            <Button
                              style={{
                                backgroundColor: "#80471C",
                                float: "right",
                              }}
                              variant="contained"
                              size="small"
                              onClick={handleUpdate}
                            >
                              Submit
                            </Button>
                          </Box>
                        </Modal>
                        <Button
                          style={{ backgroundColor: "#65350f" }}
                          variant="contained"
                          size="small"
                          onClick={() => {
                            handleDelete(quotes.id);
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
