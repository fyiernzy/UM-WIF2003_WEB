import nodemailer from "nodemailer";

const sendEmail = async (option) => {
    console.log("Preparing to send email to:", option.email);
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: option.email,
            subject: option.subject,
            html: option.message,
        };

        console.log("Email options prepared:", mailOptions);

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully. Info:", info);
    } catch (err) {
        console.error("Failed to send email:", err);
        throw err; // Rethrow the error for better error handling in the calling function
    }
};

const mailTemplate = (content, buttonUrl, buttonText) => {
    console.log("Generating email template with URL:", buttonUrl);
    return `<!DOCTYPE html>
  <html>
  <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
    <div
      style="
        max-width: 400px;
        margin: 10px;
        background-color: #fafafa;
        padding: 25px;
        border-radius: 20px;
      "
    >
      <p style="text-align: left;">
        ${content}
      </p>
      <a href="${buttonUrl}" target="_blank">
        <button
          style="
            background-color: #444394;
            border: 0;
            width: 200px;
            height: 30px;
            border-radius: 6px;
            color: #fff;
          "
        >
          ${buttonText}
        </button>
      </a>
      <p style="text-align: left;">
        If you are unable to click the above button, copy paste the below URL into your address bar
      </p>
      <a href="${buttonUrl}" target="_blank">
          <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">
            ${buttonUrl}
          </p>
      </a>
    </div>
  </body>
</html>`;
};

export { sendEmail, mailTemplate };
