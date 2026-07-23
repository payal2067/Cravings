import React from "react";
import RestaurantAdress from "./RestaurantAdress";
import RestaurantBankingAndDocument from "./RestaurantBankingDocument";
import RestaurantSocialMediaLinks from "./RestaurantSocialMediaLinks";

const Index = () => {
  return (
    <>
      <div className="overflow-y-auto h-full p-2 space-y-2">
        <RestaurantAdress />
        <RestaurantBankingAndDocument />
        <RestaurantSocialMediaLinks />
      </div>
    </>
  );
};

export default Index;
