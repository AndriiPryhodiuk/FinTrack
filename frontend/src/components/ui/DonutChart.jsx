const DonutChart = ({ data, total }) => {
  const size = 180;
  const stroke = 28;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  let prev = 0;

  return (
    <svg width={size} height={size}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {data.map((cat, i) => {
          const val = cat.sum / total;
          const dash = circ * val;
          const dashArray = `${dash} ${circ - dash}`;
          const el = (
            <circle
              key={cat.icon}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={cat.color}
              strokeWidth={stroke}
              strokeDasharray={dashArray}
              strokeDashoffset={circ - prev}
              style={{ transition: "stroke-dashoffset 0.5s" }}
            />
          );
          prev += dash;
          return el;
        })}
      </g>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius - stroke / 2}
        fill="#18181b"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="-0.2em"
        fontSize="18"
        fill="#fff"
        fontWeight="bold"
      >
        Spend this
      </text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy="1.2em"
        fontSize="18"
        fill="#fff"
        fontWeight="bold"
      >
        month
      </text>
    </svg>
  );
};
export default DonutChart;
