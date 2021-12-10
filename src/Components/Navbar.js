import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../Styles/Nav.style.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { mycontext } from "./Contex"
import { addQuestion } from '../question.service';


export default function NavbarFn() {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setQuestionRaise(initailState);
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const {
        questionRaise,
        setQuestionRaise,
        questionData,
        setQuestionData,
        initailState,
        setSearch,
        searchName
    } = useContext(mycontext);

    const handleChange = (e) => {
        setQuestionRaise({
            ...questionRaise,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShow(false);
        const myData = {
            name: questionRaise.name,
            question: questionRaise.question
        };
        if (myData.name && myData.question) {
            addQuestion(myData).then((res) => {
                setQuestionData([...questionData, res.data.result]);
                setQuestionRaise(initailState);
            });
            toast.success("Question raised successfully");
        } else {
            toast.error("Must fill all the fields");
        }

    };
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand className="NavHeading">StackOverFlow Clone</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link  as={Link} to="/">Home</Nav.Link>
                        <Nav.Link onClick={handleShow}> Ask Question</Nav.Link>
                    </Nav>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ask Question</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="navInputBox">
                                <input type="text" placeholder="UserName" name="name" value={questionRaise.name} onChange={handleChange} /><br /><br />
                                <textarea rows="5" cols="20" placeholder="Type Your Question.." name="question" value={questionRaise.question} onChange={handleChange} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={handleClose}>
                              Cancel
                            </Button>
                            <Button variant="warning" className="addBtn" onClick={handleSubmit}>
                         Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search Question ...."
                            className="me-2"
                            aria-label="Search"
                            onChange={handleSearch}
                        />

                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}