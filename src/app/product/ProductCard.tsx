import { Box, Typography, Rating, IconButton, Button } from "@mui/material";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import { useTranslation } from "react-i18next";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
import DetailModal from "./DetailModal";
import {
  markProductAsViewed,
  toggleProductLike,
  isProductLiked,
} from "@/utils/userBehavior";

const ProductCard = ({ product }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [liked, setLiked] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setLiked(isProductLiked(product.id));
  }, [product.id]);

  const openModal = (product: any) => {
    setDetailData(product);
    markProductAsViewed(product.id);
    setIsFormOpen(true);
  };

  const handleLikeClick = () => {
    const newLikedStatus = toggleProductLike(product.id);
    setLiked(newLikedStatus); // Cập nhật UI ngay lập tức
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(25% - 18px)" },
        boxShadow: "var(--box-shadow-paper)",
        borderRadius: "15px",
        overflow: "hidden",
        position: "relative",
        bgcolor: "white",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        mb: 3,
        // Add hover effect for the entire card itself
        "&:hover": {
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // Slightly stronger shadow on hover
          // Target the overlay within THIS specific card when it's hovered
          "& .hover-overlay": {
            // Use a class name or data attribute for more specific targeting
            opacity: 1,
            visibility: "visible",
          },
          "& .hover-icon-favorite": {
            // Target individual icons with delay
            transform: "translateY(0)",
            opacity: 1,
          },
          "& .hover-icon-cart": {
            transform: "translateY(0)",
            opacity: 1,
            transitionDelay: "0.1s", // Delayed transition
          },
          "& .hover-icon-buy": {
            transform: "translateY(0)",
            opacity: 1,
            transitionDelay: "0.2s", // Further delayed transition
          },
        },
      }}
    >
      {/* Discount Percentage */}
      {product.discountPercentage && (
        <Box
          sx={{
            position: "absolute",
            top: 15,
            left: 15,
            background: "linear-gradient(45deg, #f44336, #e91e63)",
            color: "white",
            px: 1,
            py: 0.5,
            borderRadius: 8,
            fontSize: "0.8rem",
            fontWeight: "bold",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Flame style={{ width: "20px", height: "20px" }} />-
          {product.discountPercentage}%
        </Box>
      )}
      {/* HOT Tag */}
      {product.isHot && (
        <Box
          sx={{
            position: "absolute",
            top: 15,
            right: 15,
            width: "50px",
            height: "50px",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              borderWidth: "0 25px 25px 0",
              borderStyle: "solid",
              borderColor: "transparent #ff4d4f transparent transparent",
            },
            "&::after": {
              content: '"HOT"',
              position: "absolute",
              top: 8,
              right: 2,
              color: "white",
              fontSize: "0.75rem",
              fontWeight: "bold",
              transform: "rotate(45deg)",
              transformOrigin: "top right",
            },
            zIndex: 2,
          }}
        />
      )}

      {/* Product Image */}
      <Box
        sx={{
          width: "100%",
          height: "200px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f0f0f0",
          overflow: "hidden",
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />

        {/* Hover Icons Overlay */}
        {/* Add a specific class name or data attribute to target this element */}
        <Box
          className="hover-overlay" // Add this class name
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            bgcolor: "rgba(0, 0, 0, 0.5)",
            opacity: 0, // Hidden by default
            visibility: "hidden", // Hidden by default
            transition: "opacity 0.3s ease, visibility 0.3s ease", // Smooth transition
          }}
        >
          {/* Individual Icons */}
          <IconButton
            onClick={handleLikeClick}
            className="hover-icon-favorite" // Add class name
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.2)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
              transform: "translateY(20px)", // Start slightly down
              opacity: 0,
              transition: "transform 0.3s ease, opacity 0.3s ease", // Base transition for icons
            }}
            aria-label="Add to favorites"
          >
            {liked ? (
              <FavoriteIcon sx={{ color: "#ff6b81" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton
            className="hover-icon-cart" // Add class name
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.2)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
              transform: "translateY(20px)",
              opacity: 0,
              transition: "transform 0.3s ease, opacity 0.3s ease", // Transition will be overridden by parent hover
            }}
            aria-label="Add to cart"
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>
          <IconButton
            className="hover-icon-buy" // Add class name
            sx={{
              color: "white",
              bgcolor: "rgba(255,255,255,0.2)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.4)" },
              transform: "translateY(20px)",
              opacity: 0,
              transition: "transform 0.3s ease, opacity 0.3s ease", // Transition will be overridden by parent hover
            }}
            aria-label="Buy now"
          >
            <BoltIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Product Details (rest of your existing code) */}
      <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {product.company}
          </Typography>
          {product.inStock && (
            <Button
              onClick={() => openModal(product)}
              sx={{
                bgcolor: "#4CAF50",
                color: "white",
                px: 1,
                py: 0.5,
                borderRadius: "5px",
                fontSize: "0.75rem",
              }}
            >
              <Typography style={{ textTransform: "none", fontSize: 15 }}>
                {t("COMMON.XEMCHITIET")}
              </Typography>
            </Button>
          )}
        </Box>
        <Typography
          variant="subtitle1"
          color="black"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          {product.name}
        </Typography>
        <Typography variant="h6" color="primary.main" fontWeight="bold">
          {product.currentPrice.toLocaleString("vi-VN")} VND
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textDecoration: "line-through", mb: 1 }}
        >
          {product.originalPrice.toLocaleString("vi-VN")} VND
        </Typography>
        <Typography
          variant="body2"
          color="success.main"
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          {t("COMMON.TIETKIEM")} {product.savings.toLocaleString("vi-VN")} VND
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: "auto" }}>
          <Rating
            name="read-only"
            value={product.rating}
            readOnly
            precision={0.5}
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.salesCount} {t("COMMON.DABAN")})
          </Typography>
        </Box>
      </Box>

      <DetailModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={detailData}
      />
    </Box>
  );
};

export default ProductCard;
