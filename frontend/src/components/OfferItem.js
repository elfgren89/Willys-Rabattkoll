import React, { useState } from "react";
import "./OfferItem.css";

const OfferItem = ({ offer }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const getSaveAmountClass = (saveAmount) => {
    if (saveAmount > 29) return "high";
    if (saveAmount > 15) return "medium";
    return "low";
  };

  const handleCardClick = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      setTimeout(() => setIsSpinning(false), 1200);
    }
  };

  return (
    <div
      className={`offer-item ${isSpinning ? "spinning" : ""}`}
      onClick={handleCardClick}
    >
      {/* Sänkt pris */}
      {offer.discountedPrice && (
        <div className="discount-label">
          {offer.conditionLabel ? `${offer.conditionLabel} ` : ""}
          <span className="discounted-price">{`${offer.discountedPrice} ${offer.priceUnit || "kr"}`}</span>
        </div>
      )}

      {/* Produktbild */}
      <div className="offer-image-wrapper">
        <img src={offer.image.url} alt={offer.name} className="offer-image" />

        {/* Besparing */}
        {offer.saveAmount && (
          <div
            className={`offer-save-amount ${
              isSpinning ? "zoom-effect" : ""
            } ${getSaveAmountClass(offer.saveAmount)}`}
          >
            Spara {offer.saveAmount} {offer.priceUnit || "kr"}
          </div>
        )}

        {/* Vikt eller volym */}
        {offer.weightVolume && (
          <div className="offer-weight-volume">{offer.weightVolume}</div>
        )}
      </div>

      {/* Produktinformation - now wrapped in a container */}
      <div className="offer-text-content">
        <h2 className="offer-name">{offer.name}</h2>
        <p className="offer-manufacturer">Tillverkare: {offer.manufacturer}</p>
        <p className="offer-original-price">
          Originalpris:{" "}
          {offer.originalPrice
            ? `${offer.originalPrice} ${offer.priceUnit || "kr"}`
            : "No price available"}
        </p>
      </div>
    </div>
  );
};

export default OfferItem;
