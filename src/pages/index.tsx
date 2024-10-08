import { API_URL } from "api/products";
import axios from "axios";
import CardProduct from "components/CardProduct";
import ShopCard from "components/ShopCard";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { productsState } from "state";
import { authorize, getAccessToken, getPhoneNumber } from "zmp-sdk/apis";
import { Page } from "zmp-ui";

const HomePage: React.FunctionComponent = () => {
  const shopProducts = useRecoilValue(productsState);
  const [isLogin, setIsLogin] = useState(false);

  getAccessToken({
    success: async (accessToken) => {
      // send access token to server to get user info
      try {
        const response = await axios.get(`${API_URL}/users/info`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200) {
          // User existed
          setIsLogin(true);
          // console.log(response.data);
        } else if (response.status === 204) {
          // User not existed
          authorize({
            scopes: ["scope.userPhonenumber"],
            success: () => {
              getPhoneNumber({
                success: async (data) => {
                  const { token } = data;
                  //call to server to save user info and phone number by token
                  try {
                    const response = await axios.get(`${API_URL}/users/auth`, {
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                        token,
                      },
                    });

                    console.log(response.data);
                    if (response.status === 200) {
                      setIsLogin(true);
                      // console.log(response.data);
                    } else {
                      console.log("Error");
                    }
                  } catch (error) {
                    console.log("error 0: ");
                    console.log(error);
                  }
                },
                fail: (error) => {
                  // Xử lý khi gọi api getPhoneNumber thất bại
                  console.log("error 1: ");
                  console.log(error);
                },
              });
            },
            fail: (error) => {
              // xử lý khi gọi authorize thất bại
              console.log("error 2: ");
              console.log(error);
            },
          });
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log("error 2: ");
        console.log(error);
      }
    },
    fail: (error) => {
      // xử lý khi gọi api thất bại
      console.log("error 4: ");
      console.log(error);
    },
  });

  return (
    <Page>
      {isLogin && (
        <div>
          <div className="bg-primary">
            <ShopCard />
          </div>
          <div className="bg-gray-100 h-3" />
          <div className="bg-white p-3">
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
      )}
    </Page>
  );
};

export default HomePage;
