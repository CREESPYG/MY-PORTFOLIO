export default function Card3D({ children, style = {}, className = '' }) {
  return (
    <div
      className={`card-3d ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
