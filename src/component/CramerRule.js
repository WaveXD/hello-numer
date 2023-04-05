import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from "mathjs";
import Navbar from "../Dropdown1";


function determinant(matrix) {
    if (matrix.length === 0) {
        return 1;
    }

    if (matrix.length === 1) {
        return matrix[0][0];
    }

    if (matrix.length === 2) {
        return (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
    }

    let det = 0;
    for (let i = 0; i < matrix[0].length; i++) {
        let submatrix = matrix.slice(1).map(row => row.slice(0, i).concat(row.slice(i + 1)));
        det += Math.pow(-1, i) * matrix[0][i] * determinant(submatrix);
    }
    return det;
}

function CramerSolver(props) {
    const [results, setResults] = useState([]);

    const { A, B } = props;

    function handleClick() {
        let detA = determinant(A);
        let xResults = [];
        for (let i = 0; i < A[0].length; i++) {
            const C = JSON.parse(JSON.stringify(A));
            for (let j = 0; j < A.length; j++) {
                C[j][i] = B[j];
            }
            let x = determinant(C) / detA;
            xResults.push(x);
        };
        setResults(xResults);
    }

    return (
        <div>
            <button onClick={handleClick}>Solve</button>
            {results.map((x, i) => <div key={i}>x{i + 1}: {x.toFixed(2)}</div>)}
        </div>
    );
}

function CramerRule() {

    const A = [
        [2, 3, 1],
        [3, 1, 3],
        [5, -2, 4]
    ];

    const B = [0, -2, -3];

    return (
        <div>
            <Navbar></Navbar>
            <p>2(x1) + 3(x2) + 5(x3)  =   0<br></br>
                3(x1) + 1(x2) − 2(x3) =   -2<br></br>
                x1 + 3(x2) + 4(x3)    =    -3</p>
            <CramerSolver A={A} B={B} />
        </div>
    );
}


export default CramerRule;
