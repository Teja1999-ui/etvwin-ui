import "./StarBorder.css";

const StarBorderButton = ({
  children,
  className = "",
  color = "white",
  speed = "4s",
  thickness = 2,
  ...props
}) => {
  return (
    <button
      className={`star-border-container ${className}`}
      style={{ padding: `${thickness}px` }}
      {...props}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />

      <div className="inner-content">{children}</div>
    </button>
  );
};

export default StarBorderButton;