import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "./Modal";
import "./App.css";

export type SceneType = {
  key: string;
  keywordKeys: string[];
  propCat: string;
  url: string;
};

function App() {
  const count = 30;
  const [sceneList, setSceneList] = useState<Array<SceneType>>([]);
  const [displayList, setDisplayList] = useState<Array<SceneType>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedScene, setSelectedScene] = useState<SceneType>();

  useEffect(() => {
    async function fetchData() {
      const {
        data: {
          data: { sceneGroups },
        },
      } = await axios.get(
        "https://img.pixton.com/data/comic-scene-group-data.json"
      );
      setSceneList(sceneGroups);
      setDisplayList(sceneGroups.slice(0, count));
    }
    fetchData();
  }, []);

  const handleScroll = () => {
    setDisplayList([
      ...displayList,
      ...sceneList.slice(displayList.length, displayList.length - 1 + count),
    ]);
  };
  const hasMore = displayList.length < sceneList.length;

  const handleImgClick = async (scene: SceneType) => {
    document.body.style.overflow = "hidden";
    setSelectedScene(scene);
    setShowModal(!showModal);
  };

  const closeSelectedScene = () => {
    document.body.style.overflow = "auto";
    setSelectedScene(undefined);
    setShowModal(!showModal);
  };

  return (
    <div className="App">
      <InfiniteScroll
        dataLength={displayList.length}
        next={handleScroll}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div>
          <div id="gallery-grid">
            {displayList.map((scene, index) => {
              return (
                <div key={`${scene.key}-${index}`}>
                  <img
                    className="list-img"
                    alt="scene"
                    src={scene.url}
                    width="200"
                    height="200"
                    onClick={() => handleImgClick(scene)}
                  ></img>
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {selectedScene && (
        <Modal
          showModal={showModal}
          scene={selectedScene}
          onClose={closeSelectedScene}
        />
      )}
    </div>
  );
}

export default App;
