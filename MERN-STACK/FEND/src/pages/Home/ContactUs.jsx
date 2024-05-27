import { useRef } from "react";
import { useTitle } from "../../hooks/useTitle";
import { feebackMail } from "../../services/mailService";
import { toast } from "react-toastify";
import Contact from "../../assets/contact.png";

export const ContactUs = () => {
  useTitle("Contact Us");
  const email = useRef();
  const feedback = useRef();

  const reset = () => {
    email.current.value = "";
    feedback.current.value = "";
    // email.current.focus();
  };

  const handleSubmit = async (e) => {
    toast.success("Sending EMail");
    e.preventDefault();
    try {
      const msgDetails = {
        email: email.current.value,
        feedback: feedback.current.value,
      };
      const response = await feebackMail(msgDetails);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    reset();
  };

  return (
    <div className="row mt-5">
      <div className="col-lg-6 col-md-12 flex-column element-center">
        <div className="contact ms-5">
          <form onSubmit={handleSubmit}>
            <div className="d-flex">
              <h3>Share Your Feedback</h3>
            </div>

            <div className="form-outline mb-5 my-5">
              <label className="form-label">Your Email address</label>
              <input
                ref={email}
                type="text"
                className="form-control"
                required
                autoComplete="off"
              />
            </div>

            <div className="form-outline mb-5">
              <label className="form-label">Your Query</label>
              <div>
                <textarea
                  ref={feedback}
                  className="comment form-control"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-danger btn-block mb-4">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-6 col-md-12 flex-column">
        <img src={Contact} alt="contact" className="mern" />
      </div>
    </div>
  );
};
