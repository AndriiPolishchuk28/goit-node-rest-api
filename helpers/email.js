import sgMail from "@sendgrid/mail";
import dotenv from "dotenv/config";

const { SENGRID_API } = process.env;

sgMail.setApiKey(SENGRID_API);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: "andrey.work28@gmail.com",
    subject: "Verify email",
  };
  await sgMail.send({
    ...data,
    from: "andrey.work28@gmail.com",
    subject: "Verify email",
  });
};

export default sendEmail;
