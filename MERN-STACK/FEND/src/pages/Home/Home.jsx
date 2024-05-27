import "../../App.css";
import { useTitle } from "../../hooks/useTitle";

export const Home = () => {
  useTitle("Home");
  return (
    <div>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner" style={{ height: "700px" }}>
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100 vh-50 "
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1463694775559-eea25626346b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
