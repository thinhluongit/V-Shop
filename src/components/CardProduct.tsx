import React from "react";
import { Box, Icon } from "zmp-ui";
import { Product } from "models";

const CardProduct = ({ title, price, sku, thumbnail }: Product) => {
  return (
    <div
      className="w-full flex flex-row items-center border border-[#E4E8EC] rounded-lg overflow-hidden h-24"
      role="button">
      <div className="w-24 flex-none">
        <div className="w-full relative" style={{ paddingTop: "100%" }}>
          <img
            src={thumbnail}
            alt={title}
            className="w-full absolute top-0 left-0 h-full object-cover"
          />
        </div>
      </div>
      <div className=" p-3 pr-0 flex-1">
        <div className="line-clamp-2 text-sm break-words text-red-500 font-bold">
          {sku}
        </div>
        <div className="line-clamp-2 text-sm break-words">{title}</div>

        <span className=" pt-2 font-semibold text-sm text-primary">
          {price}
          <span className="text-xs text-red-500 font-bold"> đ </span>
        </span>
      </div>
      <>
        <Box
          mx={2}
          flex
          justifyContent="center"
          alignItems="center"
          className="flex-none">
          <div
            className="w-6 h-6 rounded-full bg-primary flex justify-center items-center"
            // onClick={() => {}}
            role="button">
            <Icon icon="zi-plus" size={16} className="text-white" />
          </div>
        </Box>
      </>
    </div>
  );
};

export default CardProduct;
