"use client";

import {
  Box,
  Typography,
  Link,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import ProductCard from "../ProductCard";
import { useEffect, useState } from "react";
import { getLikedProducts } from "@/utils/userBehavior";
import { useTranslation } from "react-i18next";

export interface Product {
  id: number;
  image: string;
  company: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  savings: number;
  discountPercentage: number;
  rating: number;
  salesCount: number;
  inStock: boolean;
  isHot: boolean;
}

const Iproducts = [
  {
    id: 1,
    image: "/images/dialy.jpg",
    company: "Địa lý",
    name: "Địa lý 12",
    currentPrice: 1000000,
    originalPrice: 700000,
    savings: 300000,
    discountPercentage: 30,
    rating: 4.9,
    salesCount: 347,
    inStock: true,
    isHot: true,
  },
  {
    id: 2,
    image: "/images/lichsu.webp",
    company: "Lịch sử",
    name: "Lịch sử 12",
    currentPrice: 1000000,
    originalPrice: 500000,
    savings: 500000,
    discountPercentage: 50,
    rating: 4.6,
    salesCount: 42,
    inStock: true,
    isHot: true,
  },
  // Lưu ý: bạn có 2 sản phẩm với id=4, trong React key nên là duy nhất.
  // Tôi sẽ giữ nguyên để khớp với code của bạn, nhưng đã sửa id cuối thành 5 để ví dụ hoạt động tốt hơn.
  {
    id: 3,
    image: "/images/toan12.jpg",
    company: "Toán",
    name: "Toán 12",
    currentPrice: 3000000,
    originalPrice: 2700000,
    savings: 300000,
    discountPercentage: 10,
    rating: 4.7,
    salesCount: 283,
    inStock: true,
    isHot: true,
  },
  {
    id: 4,
    image: "/images/hinhhoc.jpg",
    company: "Hình học",
    name: "Hình học 12",
    currentPrice: 1500000,
    originalPrice: 1350000,
    savings: 150000,
    discountPercentage: 10,
    rating: 3.8,
    salesCount: 482,
    inStock: true,
    isHot: true,
  },
  {
    id: 5, // Sửa id để tránh trùng lặp key
    image: "/images/sinhhoc.jpg",
    company: "Sinh học",
    name: "Sinh học 12",
    currentPrice: 1500000,
    originalPrice: 150000,
    savings: 1350000,
    discountPercentage: 90,
    rating: 4.8,
    salesCount: 600,
    inStock: true,
    isHot: false,
  },
  {
    id: 6,
    image: "/images/nguvan.jpg",
    company: "Ngữ văn",
    name: "Ngữ văn 12",
    currentPrice: 1500000,
    originalPrice: 1350000,
    savings: 150000,
    discountPercentage: 10,
    rating: 3.8,
    salesCount: 482,
    inStock: true,
    isHot: true,
  },
  {
    id: 7, // Sửa id để tránh trùng lặp key
    image: "/images/tienganh.jpg",
    company: "Tiếng anh",
    name: "Tiếng anh 12",
    currentPrice: 1500000,
    originalPrice: 1350000,
    savings: 150000,
    discountPercentage: 10,
    rating: 4.8,
    salesCount: 600,
    inStock: true,
    isHot: false,
  },
];

const FavouritePage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const likedIds = getLikedProducts(); // Lấy danh sách ID đã thích từ localStorage
    const likedProducts = Iproducts.filter((product) =>
      likedIds.includes(product.id)
    );
    setFilteredProducts(likedProducts);
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {t("COMMON.SANPHAMNOIBAT")} ({filteredProducts.length})
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: {
            xs: "center",
            sm: "flex-start",
          },
        }}
      >
        {filteredProducts.length === 0 ? (
          <Typography>Chưa có sản phẩm nào được yêu thích.</Typography>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default FavouritePage;
