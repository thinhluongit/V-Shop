import CardProduct from "components/CardProduct";
import ShopCard from "components/ShopCard";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { productState } from "state";
import { Page } from "zmp-ui";
import { authorize, getAccessToken, getUserInfo } from "zmp-sdk/apis";
import { getPhoneNumber } from "zmp-sdk/apis";

const HomePage: React.FunctionComponent = () => {
  const shopProducts = useRecoilValue(productState);

  // useEffect(async () => {
  //   try {
  //     const data = await authorize({
  //       scopes: ["scope.userLocation", "scope.userPhonenumber"],
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     // xử lý khi gọi api thất bại
  //     console.log(error);
  //   }
  // }, []);
  console.log("runabc");

  // const authorize = async () => {
  //   try {
  //     const data = await authorize();
  //     console.log(data);
  //   } catch (error) {
  //     // xử lý khi gọi api thất bại
  //     console.log(error);
  //   }
  // };

  authorize({
    scopes: ["scope.userInfo", "scope.userPhonenumber"],
    success: () => {
      // xử lý khi gọi api thành công
      console.log("success");
      getPhoneNumber({
        success: async (data) => {
          let { token } = data;
          console.log(data);

          console.log("token" + token);
        },
        fail: (error) => {
          // Xử lý khi gọi api thất bại
          console.log(error);
        },
      });
      getUserInfo({
        success: (data) => {
          // xử lý khi gọi api thành công
          const { userInfo } = data;
          console.log(userInfo);
        },
        fail: (error) => {
          // xử lý khi gọi api thất bại
          console.log(error);
        },
      });
      getAccessToken({
        success: (accessToken) => {
          // xử lý khi gọi api thành công
          console.log(accessToken);
        },
        fail: (error) => {
          // xử lý khi gọi api thất bại
          console.log(error);
        },
      });
    },
    fail: (error) => {
      // xử lý khi gọi api thất bại
      console.log(error);
    },
  });

  return (
    <Page>
      <div>
        <div className="bg-primary">
          <ShopCard />
        </div>
        <div className="bg-gray-100 h-3" />
        <div
          className="bg-white p-3"
          // style={{ marginBottom: totalPrice > 0 ? "120px" : "0px" }}
        >
          {shopProducts.map((product) => (
            <div className=" mb-2 w-full" key={product.id}>
              <CardProduct
                id={product.id}
                title={product.title}
                price={product.price}
                sku={product.sku}
                thumbnail={product.thumbnail}
              />
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default HomePage;
