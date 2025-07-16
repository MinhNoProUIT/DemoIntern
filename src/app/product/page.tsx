"use client";

import {
  Box,
  Typography,
  Link,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import ProductCard from "./ProductCard";

import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { getViewHistory, getLikedProducts } from "@/utils/userBehavior";
import HistoryModal from "./HistoryModal";

interface Product {
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

const INITIAL_PRODUCT_LIMIT = 4;

const HomePage = () => {
  const { t } = useTranslation();
  const [products, setTopics] = useState(Iproducts);
  const [searchKey, setSearchKey] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [limit, setLimit] = useState(INITIAL_PRODUCT_LIMIT);

  const [isFormHistoryOpen, setIsFormHistoryOpen] = useState(false);
  const [historyData, setHistoryData] = useState<Product[] | null>(null);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]); // Tăng max range để bao hết sản phẩm

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setPriceRange([value[0], value[1]]);
    }
  };

  const handleShowAll = (e) => {
    e.preventDefault();
    setLimit(filteredProducts.length);
  };

  const handleCollapse = (e) => {
    e.preventDefault();
    setLimit(INITIAL_PRODUCT_LIMIT);
  };

  const filteredProducts = products.filter((product) => {
    const inPriceRange =
      product.currentPrice >= priceRange[0] &&
      product.currentPrice <= priceRange[1];

    let matchesSearchKey = true;
    if (searchKey) {
      const value = product[searchBy];
      if (typeof value === "number") {
        matchesSearchKey = value === Number(searchKey);
      } else {
        matchesSearchKey =
          value?.toLowerCase().includes(searchKey.toLowerCase()) || false;
      }
    }

    return inPriceRange && matchesSearchKey;
  });

  const handleGetSuggestions = async () => {
    const viewedIds = getViewHistory();
    const likedIds = getLikedProducts();

    console.log("Sending to API:", { viewedIds, likedIds });

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ viewedIds, likedIds }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong with the API");
      }

      console.log("API Response:", result);
      alert(
        "Gọi API thành công! Dữ liệu đã được gửi và nhận lại. Kiểm tra F12 Console."
      );
    } catch (error) {
      console.error("Failed to call suggestion API:", error);
      alert(`Lỗi khi gọi API: ${error.message}`);
    }
  };
  const handleShowHistory = () => {
    const viewedIds = getViewHistory();
    const viewedProducts = products.filter((p) => viewedIds.includes(p.id));

    viewedProducts.sort(
      (a, b) => viewedIds.indexOf(a.id) - viewedIds.indexOf(b.id)
    );

    //alert(`Lịch sử đã xem:\n${historyNams}`);

    setHistoryData(viewedProducts);
    setIsFormHistoryOpen(true);
  };

  useEffect(() => {}, [setTopics, setSearchBy]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Box
        sx={{
          width: "calc(100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          gap: "24px",
        }}
      >
        <Box
          sx={{
            width: "calc(100% / 4)",
            boxShadow: "var(--box-shadow-paper)",
            borderRadius: "15px",
            overflow: "hidden",
            height: "fit-content",
          }}
        >
          <Box>
            <div
              style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}
            >
              <TextField
                id="location-search"
                type="search"
                placeholder={
                  t("COMMON.TOPIC.SEARCH_BY") + t("COMMON.TENKHOAHOC")
                }
                variant="outlined"
                required
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                sx={{
                  flex: 2,
                  "& fieldset": {
                    borderRadius: "10px",
                    borderColor: "var(--border-color)",
                  },
                  "& .MuiInputBase-root": {
                    paddingLeft: "0px",
                    paddingRight: "12px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "10px 0px",
                    color: "var(--text-color)",
                    fontSize: "16px",
                    "&::placeholder": {
                      color: "var(--placeholder-color)",
                      opacity: 1,
                    },
                  },
                  "& .MuiOutlinedInput-root:hover fieldset": {
                    borderColor: "var(--hover-field-color)",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "var(--selected-field-color)",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: "#a5bed4",
                            padding: "12px",
                            zIndex: 100,
                          }}
                        >
                          <SearchIcon />
                        </Box>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <h2>{t("COMMON.SANPHAMNOIBAT")}</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <input
                  type="number"
                  value={priceRange[0]}
                  min={0}
                  max={5000000}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  style={{ width: "45%", padding: "5px" }}
                />
                <span style={{ margin: "0 10px" }}>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  min={0}
                  max={5000000}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  style={{ width: "45%", padding: "5px" }}
                />
              </div>
              <Slider
                range
                min={0}
                max={5000000}
                step={100000}
                value={priceRange}
                onChange={handleSliderChange}
                style={{ marginBottom: "20px" }}
              />
              <p>
                {t("COMMON.GIATU")}{" "}
                <strong>{priceRange[0].toLocaleString()}đ</strong>{" "}
                {t("COMMON.DEN")}{" "}
                <strong>{priceRange[1].toLocaleString()}đ</strong>
              </p>
            </div>
          </Box>
        </Box>
        <Box
          sx={{
            width: "calc(100% / 4 * 3 + 24px)",
            boxShadow: "var(--box-shadow-paper)",
            borderRadius: "15px",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 3, maxWidth: "1200px", mx: "auto" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {t("COMMON.SANPHAMNOIBAT")} ({filteredProducts.length})
              </Typography>
              {filteredProducts.length > limit && (
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: "primary.main", fontWeight: "bold" }}
                  onClick={handleShowAll}
                >
                  {t("COMMON.XEMTATCA")}
                </Link>
              )}
            </Box>

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
              {filteredProducts.slice(0, limit).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Box>
            {limit > INITIAL_PRODUCT_LIMIT &&
              filteredProducts.length > INITIAL_PRODUCT_LIMIT && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Link
                    href="#"
                    underline="hover"
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                    onClick={handleCollapse}
                  >
                    {t("COMMON.THUGON")}
                  </Link>
                </Box>
              )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ my: 4, display: "flex", gap: 2, justifyContent: "center" }}>
        <Button variant="contained" onClick={handleGetSuggestions}>
          {t("COMMON.GOIYSANPHAMPHUHOP")}
        </Button>
        <Button variant="outlined" onClick={handleShowHistory}>
          {t("COMMON.XEMLICHSU")}
        </Button>
      </Box>

      <HistoryModal
        open={isFormHistoryOpen}
        onClose={() => setIsFormHistoryOpen(false)}
        initialData={historyData}
      />
    </Box>
  );
};

export default HomePage;
