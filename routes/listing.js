const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

router
  .route("/")
  // index route or showing all listing
  .get(wrapAsync(listingController.index))
  // new listing creation
  .post(
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
  );

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  // show listing route
  .get(wrapAsync(listingController.showListing))
  //update listing route
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  //delete listing route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//index route
router.get("/", wrapAsync(listingController.index));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
