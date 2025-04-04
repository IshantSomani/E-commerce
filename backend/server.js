const express = require("express");
const connectDb = require("./config/db");
const userRoutes = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoutes = require("./routes/order");
const cors = require("cors");
const path = require("path");
const Order = require("./model/order");
const product = require("./model/product");
require("dotenv").config();
const stripe = require("stripe")(`${process.env.SECRET_KEY}`);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDb();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  // http:..localhost:3000
  res.send("Hello ");
});

// console.log(process.env.PUBLISHABLE_KEY);

app.use("/users", userRoutes);
app.use("/products", productRoute);
app.use("/orders", orderRoutes);

// Create a new checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const {
      products,
      userId,
      customerName,
      customerContactNumber,
      address,
      pinCode,
    } = req.body;
    const { origin } = req.headers;

    // Validate required fields
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    // Prepare line items for Stripe
    const lineItems = products.map((product) => {
      if (!product.productName || !product.productPrice || !product.quantity) {
        throw new Error("Invalid product data");
      }
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.productName,
            images: product.productImages ? [product.productImages[0]] : [],
          },
          unit_amount: Math.round(product.productPrice * 100),
        },
        quantity: product.quantity,
      };
    });

    // Create checkout session first
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${origin}/paymentsuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/paymentcancel`,
      line_items: lineItems,
      mode: "payment",
      metadata: {
        userId,
        customerName,
        customerContactNumber,
        address,
        pinCode,
        productDetails: JSON.stringify(
          products.map((p) => ({
            id: p._id,
            quantity: p.quantity,
            price: p.productPrice,
            name: p.productName,
          }))
        ),
      },
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
    });

    // Now create the order with the session ID
    const order = new Order({
      products: products.map(p => ({
        product: p._id,
        quantity: p.quantity,
        price: p.productPrice
      })),
      userId,
      customerName,
      customerContactNumber,
      address,
      pinCode,
      transactionId: session.id,
      paymentStatus: 'pending',
      totalAmount: products.reduce((sum, p) => sum + (p.productPrice * p.quantity), 0)
    });

    await order.save();

    return res.status(200).json({ success: true, message: 'Order placed successfully with Stripe', session_url: session.url });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    return res.status(500).json({
      error: "Failed to create checkout session",
      message: error.message
    });
  }
});

// Handle payment success
app.get(`/paymentsuccess`, async (req, res) => {
  const { session_id } = req.query;
  const { origin } = req.headers;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      // Update the existing order's payment status
      await Order.updateOne(
        { transactionId: session_id },
        { $set: { paymentStatus: "success" } }
      );
      res.redirect(`${origin}/paymentsuccess`);
    } else {
      res.redirect(`${origin}/paymentcancel`);
    }
  } catch (error) {
    console.error("Error processing successful payment:", error);
    res.status(500).json({ error: "Failed to process payment" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on ${port}`);
});
