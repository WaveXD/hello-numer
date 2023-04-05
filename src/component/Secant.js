import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from "mathjs";
import Navbar from "../Dropdown1";

const Secant = () => {
    const [Equation, setEquation] = useState("");
    const [X, setX] = useState(0);
    const [X0, setX0] = useState(0);
    const [X1, setX1] = useState(0);
    const [html, setHtml] = useState("");
    const [valueIter, setValueIter] = useState([]);
    const [valueX, setValueX] = useState([]);

    const inputEquation = (event) => {
        console.log(event.target.value);
        setEquation(event.target.value);
    };

    const inputX0 = (event) => {
        console.log(event.target.value);
        setX0(event.target.value);
    };

    const inputX1 = (event) => {
        console.log(event.target.value);
        setX1(event.target.value);
    };

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalSecant = (x0, x1) => {
        var fX0, fX1, xnew, ea, scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};
        var data = [];

        do {
            scope = {
                x: x0,
            };
            fX0 = evaluate(Equation, scope);
            scope = {
                x: x1,
            };
            fX1 = evaluate(Equation, scope);

            xnew = x1 - (fX1 * (x1 - x0)) / (fX1 - fX0);

            iter++;

            ea = error(x1, xnew);

            obj = {
                iteration: iter,
                x: xnew,
            };

            data.push(obj);

            x0 = x1;
            x1 = xnew;
            fX0 = fX1;
        } while (ea > e && iter < MAX);

        setX(xnew);

        const print = () => {
            console.log(data);
            setValueIter(data.map((x) => x.iteration));
            setValueX(data.map((x) => x.x));
            return (
                <Container>
                    <Table striped bordered hover variant="dark">
                        <center>
                            <thead>
                                <tr>
                                    <th width="10%">Iteration</th>
                                    <th width="30%">X</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((element, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{element.iteration}</td>
                                            <td>{element.x}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </center>
                    </Table>
                </Container>
            );
        };

        return { data, print };
    };

    const calculateRoot = () => {
        const x0num = parseFloat(X0);
        const x1num = parseFloat(X1);
        const { data, print } = CalSecant(x0num, x1num);

        setHtml(print());

        console.log(valueIter);
        console.log(valueX);
    };

    return (
        <Container>
            <Navbar></Navbar>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input
                        type="text"
                        id="equation"
                        value={Equation}
                        onChange={inputEquation}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    ></input>
                    <Form.Label>Input X0</Form.Label>
                    <input
                        type="number"
                        id="X0"
                        onChange={inputX0}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    ></input>
                    <Form.Label>Input X1</Form.Label>
                    <input
                        type="number"
                        id="X1"
                        onChange={inputX1}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    ></input>
                </Form.Group>
                <Button variant="primary" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            {html}
        </Container>
    );
};

export default Secant;
