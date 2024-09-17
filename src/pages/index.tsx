import CardProduct from "components/CardProduct";
import ShopCard from "components/ShopCard";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { productsState } from "state";
import { Page } from "zmp-ui";
import { authorize, getAccessToken, getUserInfo } from "zmp-sdk/apis";
import { getPhoneNumber } from "zmp-sdk/apis";
import { API_URL, getProducts } from "api/products";
import axios from "axios";
import { Product } from "models";
import { calculateHMacSHA256 } from "utils/calculate";
const request = require("request");

const ZALO_APP_SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const HomePage: React.FunctionComponent = () => {
  const shopProducts = useRecoilValue(productsState);

  // authorize({
  //   scopes: ["scope.userInfo", "scope.userPhonenumber"],
  //   success: () => {
  //     // xử lý khi gọi api thành công
  //     console.log("success");
  //     getPhoneNumber({
  //       success: async (data) => {
  //         let { token } = data;
  //         console.log(data);

  //         console.log("token" + token);
  //       },
  //       fail: (error) => {
  //         // Xử lý khi gọi api thất bại
  //         console.log(error);
  //       },
  //     });
  //     getUserInfo({
  //       success: (data) => {
  //         // xử lý khi gọi api thành công
  //         const { userInfo } = data;
  //         console.log(userInfo);
  //       },
  //       fail: (error) => {
  //         // xử lý khi gọi api thất bại
  //         console.log(error);
  //       },
  //     });
  //     getAccessToken({
  //       success: (accessToken) => {
  //         // xử lý khi gọi api thành công
  //         console.log(accessToken);
  //       },
  //       fail: (error) => {
  //         // xử lý khi gọi api thất bại
  //         console.log(error);
  //       },
  //     });
  //   },
  //   fail: (error) => {
  //     // xử lý khi gọi api thất bại
  //     console.log(error);
  //   },
  // });

  // const getPhoneNumberUser = () => {};

  getAccessToken({
    success: async (accessToken) => {
      console.log(accessToken);
      // send access token to server to get user info and phone number
      try {
        const response = await axios.get(`${API_URL}/users/info`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // const options = {
        //   url: "https://graph.zalo.me/v2.0/me",
        //   method: "GET",
        //   headers: {
        //     access_token: accessToken,
        //     appsecret_proof: calculateHMacSHA256(
        //       accessToken,
        //       ZALO_APP_SECRET_KEY
        //     ),
        //   },
        //   qs: {
        //     fields: "id,name,birthday,picture",
        //   },
        //   json: true,
        // };

        if (response.status === 200) {
          console.log(response.data);
        } else if (response.status === 204) {
          // User not existed

          // getPhoneNumber({
          //   success: async (data) => {
          //     const { token } = data;

          //     getUserInfo({
          //       success: async (data) => {
          //         // xử lý khi gọi api thành công
          //         const { userInfo } = data;

          //         // call to server to save user info and phone number by token
          //         const response = await axios.post(`${API_URL}/users`, {
          //           userInfo: userInfo,
          //           token,
          //         });

          //         console.log(response.data);
          //         if (response.status === 200) {
          //           console.log(response.data);
          //         } else {
          //           console.log("Error");
          //         }
          //       },
          //       fail: (error) => {
          //         // xử lý khi gọi api thất bại
          //         console.log(error);
          //       },
          //     });
          //   },
          //   fail: (error) => {
          //     // Xử lý khi gọi api thất bại
          //     console.log(error);
          //   },
          // });

          authorize({
            scopes: ["scope.userInfo", "scope.userPhonenumber"],
            success: () => {
              // xử lý khi gọi api thành công
              getPhoneNumber({
                success: async (data) => {
                  const { token } = data;
                  getUserInfo({
                    success: async (data) => {
                      // xử lý khi gọi api thành công
                      const { userInfo } = data;
                      // call to server to save user info and phone number by token
                      const response = await axios.post(`${API_URL}/users`, {
                        userInfo: userInfo,
                        token,
                      });
                      console.log(response.data);
                      if (response.status === 200) {
                        console.log(response.data);
                      } else {
                        console.log("Error");
                      }
                    },
                    fail: (error) => {
                      // xử lý khi gọi api getUserInfo thất bại
                      console.log(error);
                    },
                  });
                },
                fail: (error) => {
                  // Xử lý khi gọi api getPhoneNumber thất bại
                  console.log(error);
                },
              });
            },
            fail: (error) => {
              // xử lý khi gọi authorize thất bại
              console.log(error);
            },
          });
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
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
