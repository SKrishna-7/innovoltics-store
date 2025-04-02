import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { formData, cart, total, action, otp, orderId, orderStatus } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.GMAIL_SMTP_SERVER || "smtp.gmail.com",
      port: parseInt(process.env.GMAIL_SMTP_PORT, 10) || 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    let mailOptions;

    if (action === "sendOtp") {
      mailOptions = {
        from: process.env.GMAIL_FROM_EMAIL,
        to: formData.email,
        subject: "Your OTP for Order Verification",
        text: `
          Dear ${formData.name},

          Your One-Time Password (OTP) for verifying your order is: ${otp}

          Please enter this OTP to confirm your order. It is valid for 10 minutes.

          Thank you,
          Innovoltics Team
        `,
        html: `
          <h2>Order Verification OTP</h2>
          <p>Dear ${formData.name},</p>
          <p>Your One-Time Password (OTP) for verifying your order is: <strong>${otp}</strong></p>
          <p>Please enter this OTP to confirm your order. Valid for 10 minutes.</p>
          <p>Thank you,<br>Innovoltics Team</p>
        `,
      };
    } else if (action === "confirmOrder") {
      const cartDetails = cart
        .map(
          (item) =>
            `${item.item.name} - Color: ${item.item.color}, Material: ${item.item.material}, Qty: ${item.quantity}, Price: $${item.item.price.toFixed(2)}`
        )
        .join("\n");

      mailOptions = {
        from: process.env.GMAIL_FROM_EMAIL,
        to: formData.email,
        subject: `Order Confirmation - Thank You, ${formData.name}!`,
        text: `
          Hi ${formData.name},

          Your order has been placed successfully.
          Order ID: ${orderId}
          Your order status will be updated soon. Currently, it is ${orderStatus}.
          Our team will contact you soon to confirm your requirements.

          Order Details:
          ${cartDetails}
          Total: $${total}

          Thank you for choosing Innovoltics.
          Regards,
          Innovoltics Team
        `,
        html: `
          <h2>Order Confirmation</h2>
          <p>Hi ${formData.name},</p>
          <p>Your order has been placed successfully.</p>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Status:</strong> ${orderStatus}</p>
          <p>Our team will contact you soon to confirm your requirements.</p>
          <p><strong>Order Details:</strong><br>${cartDetails.replace(/\n/g, "<br>")}</p>
          <p><strong>Total:</strong> $${total}</p>
          <p>Thank you for choosing Innovoltics.</p>
          <p>Regards,<br>Innovoltics Team</p>
        `,
      };
    } else {
      throw new Error("Invalid action specified");
    }

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


