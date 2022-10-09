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

import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where
} from "firebase/firestore";


export default function AddQuotes() {
  
  const [quotes, setquotes] = useState([]);

  const getquotes = async () => {
    //console.log(data);
    const q =query( collection(db, "Quotes"),where("isRefused", "==", false),where("isApprove", "==", false) );
    const querySnapshot = await getDocs(q)
    setquotes(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  console.log(quotes)

  const handleRefuse = async (id) => {

    try {
      const frankDocRef = doc(db, "Quotes", id);
      await updateDoc(frankDocRef, {
        isRefused:true
      })
    } catch (err) {
        console.log(err)
    }
    getquotes()
  };

  const handleApprove = async (id) => {

    try {
      const frankDocRef = doc(db, "Quotes", id);
      await updateDoc(frankDocRef, {
        isApprove:true
      })
    } catch (err) {
        console.log(err)
    }
    getquotes()
  };


  useEffect(() => {
    getquotes();
  }, []);
  return (
    <div>
      <div className="p-4 m-4">
        <h1 style={{ textAlign: "center", marginBottom: 40 }}>
          <b>APPROVE QUOTES</b>
        </h1>
        <div>
          <table className="table" style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th className="col-5">Quote</th>
                <th className="col-3">Category</th>
                <th className="col-2">Author</th>
                <th className="col-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quotes, ind) => {
                return (
                  <tr key={ind}>
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
                          value={quotes.id}
                          onClick={(e)=>handleApprove(e.target.value)}
                        >
                          Approve
                        </Button>
                        <Button
                          style={{ backgroundColor: "#65350f" }}
                          variant="contained"
                          size="small"
                          value={quotes.id}
                          onClick={(e)=>handleRefuse(e.target.value)}
                        >
                          Refuse
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

