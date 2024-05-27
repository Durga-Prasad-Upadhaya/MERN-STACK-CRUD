import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { About, Create, Home, Login, Read, SignUp, View } from "../pages";
import { Update } from "../components";
import { NotFound } from "../pages/NotFound";
import { ContactUs } from "../pages/Home/ContactUs";
import { Feedback, Setting, ViewFeedback } from "../pages/Admin";

export const AllRoutes = () => {
  return (
    <div className="d-flex flex-column min-vh-60">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/read"
          element={
            <ProtectedRoute>
              <Read />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/viewfeedback/:id"
          element={
            <ProtectedRoute>
              <ViewFeedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <ProtectedRoute>
              <View />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
