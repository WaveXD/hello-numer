import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from "mathjs";
import Navbar from "../Dropdown1";

const OnePointIteration = () => {
  const print = () => {
    console.log(data);
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

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const CalOnePointIteration = (x0) => {
    var xm, fXm, ea, scope;
    var iter = 0;
    var MAX = 50;
    const e = 0.00001;
    var obj = {};
    do {
      scope = {
        x: x0,
      };
      xm = evaluate(Equation, scope);

      scope = {
        x: xm,
      };
      fXm = evaluate(Equation, scope);

      iter++;
      ea = error(x0, xm);
      obj = {
        iteration: iter,
        X: xm,
      };
      data.push(obj);
      x0 = xm;
    } while (ea > e && iter < MAX);
    setX(xm);
  };

  const data = [];
  const [valueIter, setValueIter] = useState([]);
  const [valueX, setValueX] = useState([]);

  const [html, setHtml] = useState(null);
  const [Equation, setEquation] = useState();
  const [X, setX] = useState(0);
  const [X0, setX0] = useState(0);

  const inputEquation = (event) => {
    console.log(event.target.value);
    setEquation(event.target.value);
  };
  const inputX0 = (event) => {
    console.log(event.target.value);
    setX0(event.target.value);
  };

  const calculateRoot = () => {
    const x0num = parseFloat(X0);
    CalOnePointIteration(x0num);

    setHtml(print());

    console.log(valueIter);
    console.log(valueX);
  };

  const clear = () => {
    data.splice(0, data.length);
    setValueIter([]);
    setValueX([]);
    setHtml(null);
    setEquation("");
    setX(0);
    setX0(0);
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
        </Form.Group>
        <Button variant="dark" onClick={calculateRoot}>
          Calculate
        </Button>
        <Button variant="danger" style={{ marginLeft: "10px" }} onClick={clear}>
          Clear
        </Button>
      </Form>
      <br></br>
      <h5>Answer = {X.toPrecision(7)}</h5>
      <Container>{html}</Container>
    </Container>
  );
};

export default OnePointIteration;
