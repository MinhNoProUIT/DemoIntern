"use client";

import { Box, Typography } from "@mui/material";

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
  description: string;
}

const Iproducts = [
  {
    id: 1,
    image: "/images/dialy.jpg",
    company: "Địa lý",
    name: "Địa lý 12",
    currentPrice: 700000,
    originalPrice: 1000000,
    savings: 300000,
    discountPercentage: 30,
    rating: 4.9,
    salesCount: 347,
    inStock: true,
    isHot: true,
    description:
      "Khóa học Địa lý 12 cung cấp kiến thức toàn diện về địa lý tự nhiên và kinh tế xã hội Việt Nam. Bài giảng được thiết kế sinh động, dễ hiểu và sát với chương trình thi THPT Quốc gia.",
  },
  {
    id: 2,
    image: "/images/lichsu.webp",
    company: "Lịch sử",
    name: "Lịch sử 12",
    currentPrice: 500000,
    originalPrice: 1000000,
    savings: 500000,
    discountPercentage: 50,
    rating: 4.6,
    salesCount: 42,
    inStock: true,
    isHot: true,
    description:
      "Khóa học Lịch sử 12 giúp học sinh nắm vững các giai đoạn lịch sử Việt Nam và thế giới hiện đại. Nội dung được trình bày logic, hỗ trợ ghi nhớ bằng sơ đồ và tư liệu hình ảnh.",
  },
  {
    id: 3,
    image: "/images/toan12.jpg",
    company: "Toán",
    name: "Toán 12",
    currentPrice: 2700000,
    originalPrice: 3000000,
    savings: 300000,
    discountPercentage: 10,
    rating: 4.7,
    salesCount: 283,
    inStock: true,
    isHot: true,
    description:
      "Khóa học Toán 12 bao gồm đầy đủ đại số và giải tích, hình học không gian, bám sát cấu trúc đề thi THPT. Học viên được luyện tập với hàng trăm bài tập và đề thi thử chất lượng.",
  },
  {
    id: 4,
    image: "/images/hinhhoc.jpg",
    company: "Hình học",
    name: "Hình học 12",
    currentPrice: 1350000,
    originalPrice: 1500000,
    savings: 150000,
    discountPercentage: 10,
    rating: 3.8,
    salesCount: 482,
    inStock: true,
    isHot: true,
    description:
      "Khóa học Hình học 12 chuyên sâu về hình học không gian và tọa độ trong không gian. Hướng dẫn chi tiết từng dạng bài và cách trình bày bài thi hiệu quả.",
  },
  {
    id: 5,
    image: "/images/sinhhoc.jpg",
    company: "Sinh học",
    name: "Sinh học 12",
    currentPrice: 150000,
    originalPrice: 1500000,
    savings: 1350000,
    discountPercentage: 90,
    rating: 4.8,
    salesCount: 600,
    inStock: true,
    isHot: false,
    description:
      "Khóa học Sinh học 12 bao quát di truyền học, tiến hóa và sinh thái học. Cung cấp nhiều ví dụ thực tiễn và bài tập trắc nghiệm chuẩn hóa.",
  },
  {
    id: 6,
    image: "/images/nguvan.jpg",
    company: "Ngữ văn",
    name: "Ngữ văn 12",
    currentPrice: 1350000,
    originalPrice: 1500000,
    savings: 150000,
    discountPercentage: 10,
    rating: 3.8,
    salesCount: 482,
    inStock: true,
    isHot: true,
    description:
      "Khóa học Ngữ văn 12 tập trung phân tích tác phẩm văn học trọng tâm và kỹ năng làm văn nghị luận. Cung cấp dàn ý mẫu và hướng dẫn cách viết bài điểm cao.",
  },
  {
    id: 7,
    image: "/images/tienganh.jpg",
    company: "Tiếng anh",
    name: "Tiếng anh 12",
    currentPrice: 1350000,
    originalPrice: 1500000,
    savings: 150000,
    discountPercentage: 10,
    rating: 4.8,
    salesCount: 600,
    inStock: true,
    isHot: false,
    description:
      "Khóa học Tiếng Anh 12 giúp cải thiện kỹ năng đọc hiểu, ngữ pháp và từ vựng theo đề thi chuẩn. Bao gồm luyện nghe nói qua các video và bài tập tương tác.",
  },
];

const FavouritePage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const likedIds = getLikedProducts();
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
