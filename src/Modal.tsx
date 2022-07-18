import { SceneType } from "./App";

function Modal({
  showModal,
  scene,
  onClose,
}: {
  showModal: boolean;
  scene: SceneType;
  onClose: () => void;
}) {
  const getRandomColor = () => {
    const opacity = "0.8";
    let color = "rgba(";
    for (let i = 0; i < 3; i++) {
      color += Math.floor(Math.random() * 255) + ",";
    }
    color += opacity + ")";
    return color;
  };
  let randomColor = getRandomColor();
  return (
    <div className="modal" style={{ backgroundColor: randomColor }}>
      {showModal && (
        <div className="selected-scene">
          <button className="close-selected-scene" onClick={onClose}>
            ✕
          </button>
          <img src={scene.url} alt="selectedImg"></img>
        </div>
      )}
    </div>
  );
}

export default Modal;
