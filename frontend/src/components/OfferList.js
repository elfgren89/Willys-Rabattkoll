import React, { useEffect, useState } from "react";
import OfferItem from "./OfferItem";
import "./OfferList.css";

function OfferList() {
  const [offers, setOffers] = useState([]);
  const [visibleOffers, setVisibleOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    async function fetchOffers() {
      try {
        const response = await fetch("https://willysrabattkoll.onrender.com/campaigns?store_id=2230");
        const data = await response.json();

        const processedOffers = data.map((offer) => {
          const promotion = offer.potentialPromotions?.[0];
          
          // Extract quantity from conditionLabel (e.g., "2 för" -> 2)
          const quantityMatch = promotion?.conditionLabel?.match(/^(\d+)\s+för/i);
          const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;

          const discountedPrice =
            parseFloat(promotion?.rewardLabel?.match(/\d+,\d+|\d+/)?.[0]?.replace(",", ".")) ||
            parseFloat(offer.price);

          const saveAmount = parseFloat(promotion?.savePrice?.match(/\d+,\d+|\d+/)?.[0]?.replace(",", "."));

          // For multi-item offers, adjust the originalPrice calculation
          let originalPrice;
          if (quantity > 1 && saveAmount) {
            // If it's a multi-item offer, saveAmount is per item, but refers to total savings
            // So the original price is (discounted price + saveAmount/quantity) per item
            originalPrice = (discountedPrice + saveAmount/quantity).toFixed(2);
          } else {
            // For single item offers, use the existing calculation
            originalPrice = saveAmount
              ? (discountedPrice + saveAmount).toFixed(2)
              : discountedPrice
              ? discountedPrice
              : null;
          }

          return {
            ...offer,
            originalPrice: originalPrice,
            discountedPrice: discountedPrice,
            saveAmount: saveAmount,
            conditionLabel: promotion?.conditionLabel || null,
            weightVolume: offer.displayVolume || null,
          };
        });

        const sortedOffers = processedOffers.sort((a, b) => (b.saveAmount || 0) - (a.saveAmount || 0));

        setOffers(sortedOffers);
        setVisibleOffers(sortedOffers.slice(0, ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, []);

  const loadMoreOffers = () => {
    const nextOffers = offers.slice(visibleOffers.length, visibleOffers.length + ITEMS_PER_PAGE);
    setVisibleOffers((prevOffers) => [...prevOffers, ...nextOffers]);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && visibleOffers.length < offers.length) {
        loadMoreOffers();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleOffers, offers]);

  const totalSavings = offers.reduce((sum, offer) => sum + (offer.saveAmount || 0), 0).toFixed(2);
  const highestSaving = offers.length > 0 ? offers[0].saveAmount : 0;
  const lowestSaving = offers.length > 0 ? Math.min(...offers.map((offer) => offer.saveAmount || Infinity)) : 0;

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="offer-list-container">
      <h1 className="offer-list-header">
        {offers.length} erbjudanden denna vecka
      </h1>
      <div className="offer-summary">
        <p>Sammanlagd rabatt: <strong>{totalSavings} kr</strong></p>
        <p>Största rabatt: <strong>{highestSaving} kr</strong></p>
        <p>Minsta rabatt: <strong>{lowestSaving === Infinity ? "Ingen" : `${lowestSaving} kr`}</strong></p>
      </div>
      <div className="offer-list">
        {visibleOffers.map((offer, index) => (
          <OfferItem key={index} offer={offer} />
        ))}
      </div>
    </div>
  );
}

export default OfferList;
