import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <div className="container">
        <h1>
          A tiny
          <br /> budget
          <br />
          app
        </h1>
        <Link to="/budget">
          <button className="button">New</button>
        </Link>
      </div>
    </main>
  );
}

export default Home;
