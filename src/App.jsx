import { IconCloud } from "./components/IconCloud";

function App() {
  return (
    <div className="py">
      <div className="container">
        <div className="cloud-container">
          <IconCloud
            containerProps={{
              className: "prop-class",
            }}
            style={{ maxWidth: "560px;" }}
            canvasWidth={560}
            iconSize={40}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
