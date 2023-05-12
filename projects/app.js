require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const flash = require("express-flash");
const session = require("express-session");
const connectDB = require("./server/config/db");
const authRoutes = require("./server/routes/authRoutes");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./server/middleware/authMiddleware");

const app = express();
const port = 5000 || process.env.PORT;

// Connect to database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

//Static files / middleware
app.use(express.static("public"));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 6 * 6 * 24 * 7, // 1 week
    },
  })
);

// Flash Messages
app.use(flash({ sessionKeyName: "flashMessage" }));

//Templating engine
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//Routes
app.get("*", checkUser);
app.use("/", require("./server/routes/project"));
app.use(authRoutes);

// Home
app.get("/", (req, res) => {
  const locals = {
    title: "Projects",
    description: "Projekti LV6 - NWP",
  };

  res.render("index", locals);
});

// Handle 404
app.get("*", (req, res) => {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
