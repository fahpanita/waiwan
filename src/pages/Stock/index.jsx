import React, { useEffect } from "react";
import { Container } from "../Home";
import { useAuth } from "../../Providers/AuthProvider";
import { Image } from "antd";
import { getProducts } from "../../services/product";

const Stock = () => {
  const { profile } = useAuth();
  console.log(profile);

  const handleGetProduct = async () => {
    const res = await getProducts();
    console.log(res.data);
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  return (
    <Container>
      <div className="abc">{profile?.displayName}</div>
      <Image width={200} src={profile?.pictureUrl} />
    </Container>
  );
};

export default Stock;
