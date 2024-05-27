import { AllRoutes } from "./routes/AllRoutes";
import { Footer, Header } from "./components";
import "./App.css";

export const App = () => {

  return (
    <div>
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  );
};
