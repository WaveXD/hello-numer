import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from "mathjs";
import Navbar from "../Dropdown1";

const TaylorSeries = () => {
    const [html, setHtml] = useState(null);
    const [equation, setEquation] = useState("");
    const [x, setX] = useState(0);
    const [x0, setX0] = useState(0);
    const [n, setN] = useState(0);
    const [result, setResult] = useState(0);

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueX, setValueX] = useState([]);

    const inputEquation = (event) => {
        setEquation(event.target.value);
    };

    const inputX = (event) => {
        setX(parseFloat(event.target.value));
    };

    const inputX0 = (event) => {
        setX0(parseFloat(event.target.value));
    };

    const inputN = (event) => {
        setN(parseFloat(event.target.value));
    };

    const print = () => {
        setValueIter(data.map((x) => x.iteration));
        setValueX(data.map((x) => x.X));
        return (
            <Container>
                <Table striped bordered hover variant="dark">
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
                                    <td>{element.X}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    };

    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }

    const calculateRoot = () => {
        let scope = { x: x0 };
        let error = Number.MAX_SAFE_INTEGER;
        let iteration = 0;
        let taylorSum = 0;

        while (iteration < n) {
            const fac = factorial(iteration);
            const fX = evaluate(equation, scope);
            const taylorTerm = `${fX} * (x - ${x0})^${iteration} / ${fac}`;
            taylorSum += evaluate(taylorTerm, scope);
            data.push({ iteration: iteration, X: taylorSum });
            scope = { x: x };
            iteration++;
        }

        setResult(taylorSum);
        setHtml(print());

    };

    const clear = () => {
        data.splice(0, data.length);
        setValueIter([]);
        setValueX([]);
        setHtml(null);
        setEquation("");
        setX(0);
        setX0(0);
        setN(0);
        setResult(0);
    };

    return (
        <Container>
            <Navbar />
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input
                        type="text"
                        id="equation"
                        value={equation}
                        onChange={inputEquation}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                    <Form.Label>Input x</Form.Label>
                    <input
                        type="number"
                        id="x"
                        onChange={inputX}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                        
                    />
                    <Form.Label>Input x0</Form.Label>
                    <input
                        type="number"
                        id="x0"
                        onChange={inputX0}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                        
                    />
                    <Form.Label>Input n</Form.Label>
                    <input
                        type="number"
                        id="n"
                        onChange={inputN}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                        
                    />
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
                <Button variant="danger" style={{ marginLeft: "10px" }} onClick={clear}>
                    Clear
                </Button>
            </Form>
            <br />
            <h5>Answer = {result.toPrecision(7)}</h5>
            <Container>{html}</Container>
        </Container>
    );
};

export default TaylorSeries;
