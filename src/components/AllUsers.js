import React, { useState, useEffect } from "react";
import { Button, Card, TextField } from "@mui/material";
//import { Link, Outlet } from "react-router-dom";
import "./css/styles.css";
import { DataGrid } from "@mui/x-data-grid";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function AllUsers() {
  const userRef = collection(db, "users");
  const [users, setuser] = useState([]);

  const getusers = async () => {
    const data = await getDocs(userRef);
    //console.log(data);
    setuser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getusers();
  }, []);

  const handleDelete = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getusers();
    //setloading(true);
  };

  return (
    <div>
      <div className="p-4 m-4">
        <h1 style={{ textAlign: "center", marginBottom: 40 }}>
          <b>ALL USERS</b>
        </h1>
        <div>
          <table className="table" style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th className="col-1">Name</th>
                <th className="col-2">Email</th>
                <th className="col-2">Contact No.</th>
                <th className="col-4" style={{ backgroundColor: "#f5f5f5" }}>
                  Membership Status
                </th>
                <th className="col-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((users) => {
                return (
                  <tr>
                    <td>{users.name}</td>
                    <td>{users.email}</td>
                    <td>{users.contact}</td>
                    <td style={{ backgroundColor: "#f5f5f5" }}>
                      {users.date}
                      <b> {users.amount} </b>
                    </td>

                    <td>
                      <>
                        <Button
                          style={{
                            backgroundColor: "#65350f",
                            marginRight: 15,
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
                            handleDelete(users.id);
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
