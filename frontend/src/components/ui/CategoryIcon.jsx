import PropTypes from "prop-types";

const CategoryIcon = ({ category, size = 40 }) => {
  const icons = {
    food: "🛒",
    entertainment: "🎵",
    shopping: "🛍️",
    utilities: "🏠",
    income: "💼",
    education: "📚",
    transport: "🚌",
    health: "💊",
    other: "💡",
  };
  const colors = {
    food: "#4BE36A",
    entertainment: "#FF00C3",
    shopping: "#FFD600",
    utilities: "#4B7BE3",
    income: "#A682FF",
    education: "#FF8C00",
    transport: "#00CFFF",
    health: "#FF5E5E",
    other: "#0000ff",
  };
  return (
    <span
      className="transaction-icon"
      style={{
        fontSize: size * 0.8,
        width: size,
        height: size,
        borderRadius: "50%",
        background: colors[category] || "#18181b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff", // белый цвет для эмодзи
        flexShrink: 0,
      }}
    >
      {icons[category] || "💡"}
    </span>
  );
};

CategoryIcon.propTypes = {
  category: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default CategoryIcon;
