import { createTransport } from "nodemailer";
import Mail from "../model/mailModel.js";

export const mailService = async (req, res) => {
  const { email, feedback } = req.body;
  try {
    await Mail.create({ email, feedback });
    var transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEJS_GMAIL_APP_USER,
        pass: process.env.NODEJS_GMAIL_APP_PASSWORD,
      },
    });

    var message = {
      from: "it.webstack@gmail.com",
      to: req.body.email,
      subject: "Thanks For Your Feedback!",
      html: "<b>Thanks For Your Valuable Comment</b>",
    };

    transporter.sendMail(message, function (error, info) {
      if (error) res.status(500).json({ message: error });
      else res.status(200).json({ message: "Email Send Successfully" });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const fetchFeedback = async (req, res) => {
  let messages = await Mail.find({});
  res.status(200).json(messages);
};

export const fetchAFeedback = async (req, res) => {
  let msg = await Mail.findById(req.params.id);
  res.status(200).json(msg);
};

export const deleteAFeedback = async (req, res) => {
  let response = await Mail.findByIdAndRemove(req.params.id);
  res.status(200).json(response);
};
