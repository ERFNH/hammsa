import "./Background.css"
function Background({ children, image }) {
  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="overlay">
        {children}
      </div>
    </div>
  );
}
export default Background;