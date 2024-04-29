import { Link } from "react-router-dom";

export default function Home({ mess }) {

    return (
        <>
            <div className="title">
                <h1>Tenzies</h1>
                <p className="instructions">{mess}</p>
            </div>
            <Link to="/tenzies" style={{ textDecoration: 'none' }} className="roll-btn" >Start</Link>
        </>
    )
}