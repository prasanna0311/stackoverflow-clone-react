import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../Styles/Home.style.css";
// import { Card, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { mycontext } from "../Components/Contex";

export default function Home() {
    const { questionData,searchName} = useContext(mycontext);
    const navigate = useNavigate();
    const getId = (id) => {
        navigate(`/answer/${id}`);
    }
    const filerData = questionData.filter((data) => {
        return data.question.toLowerCase().includes(searchName.toLowerCase());
      });
    return (
        <>
            <div className="mainDiv" style={{ marginTop: ' 40px' }}>
                <h3>Questions</h3>
                <p>No of questions : {questionData.length}</p>
                {filerData.map((item, index) => {
                    return (
                        <div className="mainQuestion" onClick={() => getId(item._id)} >
                            <div className="questionDiv">
                                <p>{item.question}</p>
                            </div>
                            <div className="username">
                                <p>SubmittedBy - <strong>{item.name}</strong></p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}