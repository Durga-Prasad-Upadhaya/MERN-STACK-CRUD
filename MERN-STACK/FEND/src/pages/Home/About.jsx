import World from "../../assets/world.png";
import { useTitle } from "../../hooks/useTitle";

export const About = () => {
  useTitle("About");
  return (
    <div className="d-flex justify-content-center">
        <img className="world my-5" src={World} alt="World" />
     </div>
  );
};
