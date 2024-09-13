import React from "react";
import { Button, Icon } from "zmp-ui";
import { shop } from "../data/shop";

const ShopCard = () => {
  const shopInfo = shop;
  return (
    <div className="flex flex-row justify-between items-center p-4 bg-white">
      {shopInfo && (
        <div className="flex flex-row items-center">
          <img
            src={shopInfo.logoShop}
            alt="shop-logo"
            className=" rounded-full object-cover w-[60px] h-[60px]"
          />
          <div className=" pl-4">
            <div className=" text-base font-medium pb-1">
              {shopInfo.nameShop}
            </div>
            <div className=" text-sm font-normal text-gray-500 pb-1">
              {shopInfo.followers} theo dõi
            </div>
            <div className=" flex flex-row text-sm font-normal  text-gray-500">
              <div className="flex items-center justify-center">
                <Icon icon="zi-location-solid" size={12} />
              </div>
              <div className=" pl-1">{shopInfo.address}</div>
            </div>
          </div>
        </div>
      )}
      <Button
        className="chat-button"
        variant="secondary"
        size="small"
        // onClick={()}
      >
        Nhắn tin
      </Button>
    </div>
  );
};

export default ShopCard;
