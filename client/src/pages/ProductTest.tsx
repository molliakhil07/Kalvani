import { useParams } from "react-router-dom";

function ProductTest() {
  const { id } = useParams();

  return (
    <main
      style={{
        padding: "50px",
        color: "black",
        background: "white",
      }}
    >
      <h1>Product Test Works!</h1>
      <p>Product ID: {id}</p>
    </main>
  );
}

export default ProductTest;