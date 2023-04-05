import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs'
import Navbar from '../Dropdown1';

const NewtonRaphson = () => {
    const print = () => {
        console.log(data)
        setValueIter(data.map((x) => x.iteration));
        setValueX(data.map((x) => x.x));
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
                                    <td>{element.x}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>

        );
    }

    const CalNewtonRaphson = (x0) => {
        var fX, fXprime, xnew, ea, scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj = {};

        do {
            scope = {
                x: x0,
            }
            fX = evaluate(Equation, scope)
            fXprime = derivative(Equation, 'x').evaluate({ x: x0 })

            xnew = x0 - fX / fXprime;

            iter++;

            ea = error(x0, xnew);

            obj = {
                iteration: iter,
                x: xnew
            }

            data.push(obj)

            x0 = xnew;
        } while (ea > e && iter < MAX)

        setX(xnew)
    }

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueX, setValueX] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState()
    const [X, setX] = useState(0)
    const [X0, setX0] = useState(0)

    const inputEquation = (event) => {
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) => {
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const calculateRoot = () => {
        const x0num = parseFloat(X0)
        CalNewtonRaphson(x0num);

        setHtml(print());

        console.log(valueIter)
        console.log(valueX)
    }

    return (
        <Container>
            <Navbar></Navbar>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input X0</Form.Label>
                    <input type="number" id="X0" onChange={inputX0} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                </Form.Group>
                <Button variant="primary" onClick={calculateRoot}>Calculate</Button>
            </Form>
            {html}
        </Container>
    )
}

export default NewtonRaphson;