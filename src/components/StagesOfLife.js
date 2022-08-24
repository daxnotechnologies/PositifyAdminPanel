import React, { useState, useEffect } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { textAlign } from "@mui/system";

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
export default function StagesOfLife() {
  //  const [rows, setrows] = useState([]);
  const [p_cat, setPcat] = useState([]);
  const [img, setImg] = useState("");
  const [art, setArt] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [p_cate, setPcate] = useState([]);
  const [imge, setImge] = useState("");
  const [arte, setArte] = useState("");
  const [namee, setNamee] = useState("");
  const [eid, seteid] = useState("");

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const stagessCollectionRef = collection(db, "stagesoflife");
  const [loading, setloading] = useState(false);
  const [headerimg, setheaderImg] = useState();
  const [stages, setstages] = useState([]);

  const handleAdd = async () => {
    if (img !== null) {
      const imageRef = ref(storage, `${img}-${Date.now()}`);
      await uploadBytes(imageRef, img);
      const path = await getDownloadURL(imageRef);

      if (art !== null) {
        const imageRefart = ref(storage, `${art.name}-${Date.now()}`);
        await uploadBytes(imageRefart, art);
        const pathart = await getDownloadURL(imageRefart);

        // console.log(imageRef);
        try {
          console.log("pathhh", headerimg);
          await addDoc(stagessCollectionRef, {
            name: name,
            image: path,
            art: pathart,
            pcat: p_cat,
          });

          setName("");
          setImg("");
          setArt("");
          setPcat("");
          setOpen(false);
        } catch (err) {}
      }
    }
  };
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();
      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object

        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };
  const handleUpdate = async () => {
    if (imge !== null) {
      const imageRef = ref(storage, `${imge}-${Date.now()}`);
      await uploadBytes(imageRef, imge);
      const path = await getDownloadURL(imageRef);

      getBase64(imge)
        .then((result) => {
          imge["base64"] = result;
          setheaderImg(result);
        })
        .catch((err) => {
          console.log(err);
        });
      if (arte !== null) {
        const imageRefart = ref(storage, `${arte}-${Date.now()}`);
        await uploadBytes(imageRefart, arte);
        const pathart = await getDownloadURL(imageRefart);

        // console.log(imageRef);
        try {
          console.log("pathhh", eid);
          const frankDocRef = doc(db, "stagesoflife", eid);
          console.log("frankdocred", frankDocRef);
          await updateDoc(frankDocRef, {
            name: namee,
            image: path,
            art: pathart,
            pcat: p_cate,
          })
            .then((res) => {
              console.log("rees", res);
            })
            .catch((err) => {
              console.log("error", err);
            });

          setNamee("");
          setImge("");
          setArte("");
          setPcate("");
          setOpen1(false);
        } catch (err) {}
      }
    }
  };

  const getstagesoflife = async () => {
    const data = await getDocs(stagessCollectionRef);
    console.log(data);
    setstages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const handleDelete = async (id) => {
    const stageDoc = doc(db, "stagesoflife", id);
    await deleteDoc(stageDoc);
    getstagesoflife();
  };

  useEffect(() => {
    getstagesoflife();
  }, []);

  return (
    <div>
      <div className="p-4 m-4">
        <h1 style={{ textAlign: "center", marginBottom: 40 }}>
          <b>CATEGORIES</b>
        </h1>
        <Button
          variant="contained"
          style={{
            float: "right",
            backgroundColor: "#65350f",
            marginBottom: 30,
          }}
          onClick={handleOpen}
        >
          Add Categories
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h5 style={{ textAlign: "center", marginBottom: 15 }}>
              Add New Categories
            </h5>

            <label className="mb-2">
              <b>Upload Icon</b>
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
              label="Category Name"
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
                  onSelect={(e) => setPcat(e.target.value)}
                  value={p_cat}
                  variant="outlined"
                  label="Select Parent Categories"
                  placeholder="Select Parent Categories"
                />
              )}
            />

            <label className="mb-2">
              <b>Upload Background Art</b>
            </label>
            <input
              type="file"
              onChange={(e) => setArt(e.target.value)}
              value={art}
            ></input>

            <Button
              style={{ backgroundColor: "#65350f", float: "right" }}
              variant="contained"
              size="small"
              onClick={handleAdd}
            >
              Submit
            </Button>
          </Box>
        </Modal>

        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h5 style={{ textAlign: "center", marginBottom: 15 }}>
              Edit Stages Of Life
            </h5>
            <input
              type="file"
              onChange={(e) => setImge(e.target.value)}
              //value={imge.toString()}
            ></input>
            <TextField
              className="my-4"
              size="small"
              fullWidth
              id="outlined-basic"
              label="Name"
              value={namee}
              variant="outlined"
              onChange={(e) => setNamee(e.target.value)}
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
                  onChange={(e) => setPcate(e.target.value)}
                  value={p_cate}
                  variant="outlined"
                  label="Select Parent Categories"
                  placeholder="Select Parent Categories"
                />
              )}
            />

            <label className="mb-2">
              <b>Upload Art</b>
            </label>
            <input
              type="file"
              onChange={(e) => setArte(e.target.value)}
              // value={arte}
            ></input>

            <Button
              style={{ backgroundColor: "#65350f", float: "right" }}
              variant="contained"
              size="small"
              onClick={handleUpdate}
            >
              Submit
            </Button>
          </Box>
        </Modal>
        <div>
          <table className="table" style={{ textAlign: "center", height: 40 }}>
            <thead>
              <tr>
                <th className="col-1">Image</th>
                <th className="col-2">Name</th>
                <th className="col-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stages.map((stage) => {
                return (
                  <tr>
                    <td>
                      <img src={stage.image}></img>
                    </td>
                    <td>{stage.name}</td>
                    <td>
                      <>
                        <Button
                          style={{
                            backgroundColor: "#65350f",
                            marginRight: 15,
                          }}
                          variant="contained"
                          size="small"
                          // onClick=
                          // {() => {
                          //   handleDelete(stage.id);
                          // }}
                        >
                          View Forum
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#65350f",
                            marginRight: 15,
                          }}
                          onClick={() => {
                            setArte(stage.art);
                            setNamee(stage.name);
                            setImge(stage.image);
                            setPcate(stage.pcat);
                            seteid(stage.id);
                            handleOpen1();
                            // handleOpenEdit(stage)
                          }}
                          variant="contained"
                          size="small"
                        >
                          Edit
                        </Button>
                        <Button
                          style={{ backgroundColor: "#65350f" }}
                          variant="contained"
                          size="small"
                          onClick={() => {
                            handleDelete(stage.id);
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
