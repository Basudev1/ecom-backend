const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  // stripe.charges.create(
  //   {
  //     source: req.body.tokenId,
  //     amount: req.body.amount,
  //     currency: "inr",
  //   },
  //   (stripeErr, stripeRes) => {
  //     if (stripeErr) {
  //       res.status(500).send(stripeErr);
  //     } else {
  //       res.status(200).send(stripeRes);
  //     }
  //   }
  // );

  // Stripe Official Docs
  // Moreover you can take more details from user
  // like Address, Name, etc from form
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Dev.to User",
      address: {
        line1: "TC 9/4 Old MES colony",
        postal_code: "110092",
        city: "New Delhi",
        state: "Delhi",
        country: "India",
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 7000, // Charing Rs 25
        description: "Web Development Product",
        currency: "USD",
        customer: customer.id,
      });
    })
    .then((charge) => {
      res.send("Success"); // If no error occurs
    })
    .catch((err) => {
      res.send(err); // If some error occurs
    });
});

module.exports = router;
