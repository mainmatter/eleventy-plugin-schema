import event from "./event.js";
import product from "./product.js";
import service from "./service.js";

/**
 * Offer structured data. See https://schema.org/Offer.
 *
 * @param {Object} offer Offer properties.
 * @param {String} offer.priceCurrency The currency of the price.
 * @param {String} offer.price The offer's price.
 * @param {String} offer.priceValidUntil The date when price ends.
 * @param {String} offer.availability The availability. In stock, etc.
 * @param {String} offer.availabilityStarts The beginning of availability.
 * @param {String} offer.availabilityEnds The end of the availability.
 * @param {String} offer.itemOffered The offered item.
 * @param {String} offer.itemCondition The condition of the offered item.
 * @returns {Object|undefined}
 */
export default (data) => {
  if (!data) {
    return;
  }

  const offer = {
    "@type": "Offer",
  };

  if (data.url) {
    offer.url = data.url;
  }

  if (data.priceCurrency) {
    offer.priceCurrency = data.priceCurrency;
  }

  if (data.price) {
    offer.price = data.price;
  }

  if (data.priceValidUntil) {
    offer.priceValidUntil = data.priceValidUntil;
  }

  if (data.availability) {
    offer.availability = data.availability;
  }

  if (data.availabilityStarts) {
    offer.availabilityStarts = data.availabilityStarts;
  }

  if (data.availabilityEnds) {
    offer.availabilityEnds = data.availabilityEnds;
  }

  if (data.category) {
    offer.category = data.category;
  }

  if (data.itemCondition) {
    offer.itemCondition = data.itemCondition;
  }

  if (data.itemOffered) {
    if (data.itemOffered.type === "event") {
      offer.itemOffered = event({ meta: data.itemOffered });
    }
    if (data.itemOffered.type === "product") {
      offer.itemOffered = product({ meta: data.itemOffered }, false);
    }
    if (data.itemOffered.type === "service") {
      offer.itemOffered = service({ meta: data.itemOffered });
    }
  }

  return offer;
};
