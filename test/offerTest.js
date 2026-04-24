import test from "ava";
import offer from "../src/offer.js";
import parsedEqual from "../utils/parsedEqual.js";

test("offer", (t) => {
  const data = {
    priceCurrency: "USD",
    price: "20.00",
    priceValidUntil: "01/01/2000",
    availability: "https://schema.org/InStock",
    availabilityStarts: "01/01/2000",
    availabilityEnds: "01/01/2000",
    itemCondition: "https://schema.org/NewCondition",
  };
  const expected = {
    "@type": "Offer",
    priceCurrency: data.priceCurrency,
    price: data.price,
    priceValidUntil: data.priceValidUntil,
    availability: data.availability,
    availabilityStarts: data.availabilityStarts,
    availabilityEnds: data.availabilityEnds,
    itemCondition: data.itemCondition,
  };

  t.deepEqual(offer(data), expected);
});

test("event offer", (t) => {
  const data = {
    itemOffered: {
      type: "event",
      name: "Event",
      startDate: "2024-06-15T09:00:00",
    },
  };
  const expected = {
    "@type": "Offer",
    itemOffered: {
      "@type": "Event",
      name: "Event",
      startDate: "2024-06-15T09:00:00",
    },
  };

  t.deepEqual(offer(data), expected);
});

test("product offer", (t) => {
  const data = {
    itemOffered: {
      type: "product",
      name: "Product",
      image: {},
    },
  };
  const expected = {
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: "Product",
    },
  };

  parsedEqual(t, offer(data), expected);
});

test("service offer", (t) => {
  const data = {
    itemOffered: {
      type: "service",
      name: "Managed WordPress Hosting",
      description: "Fast and secure hosting for WordPress websites",
      url: "https://example.com/services/wordpress-hosting",
      serviceType: "Web Hosting",
    },
  };
  const expected = {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Managed WordPress Hosting",
      description: "Fast and secure hosting for WordPress websites",
      url: "https://example.com/services/wordpress-hosting",
      serviceType: "Web Hosting",
    },
  };

  parsedEqual(t, offer(data), expected);
});

test("offer empty", (t) => {
  t.is(offer(), undefined);
});
