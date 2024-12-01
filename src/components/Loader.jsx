import "./Loader.css";

export default function Loader() {
  return (
    <div className="d-flex justify-content-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
