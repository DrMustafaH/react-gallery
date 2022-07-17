import { useEffect, useState } from "react";
import axios from "axios";
import List from 'rc-virtual-list';

import "./App.css";

type SceneType = {
  key: string;
  keywordKeys: string[];
  propCat: string;
  url: string;
};

function App() {
  // const count = 30;
  const increment = 30
  // const number = 30;
  const [sceneList, setSceneList] = useState<Array<SceneType>>([]);
  const [displayList, setDisplayList] = useState<Array<SceneType>>([]);
  // const [pageIndex, setPageIndex] = useState<number>(count);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedScene , setSelectedScene] = useState<string>('')
  const [currentIndex , setCurrentIndex] = useState<number>(30)

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
      setDisplayList(sceneGroups.slice(0, 30));
    }
    fetchData();
  }, []);

  // function handleScroll(e: any) {
  //   const bottom =
  //     e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  //   console.log(bottom);
  //   if(bottom) { 
  //     const extendList =  sceneList.slice(pageIndex, pageIndex + count)
  //     setPageIndex(pageIndex + count)
  //     setDisplayList([...displayList, ...extendList])
  //   }
  // }

  const handleImgClick = (sceneUrl: string) => {
    setSelectedScene(sceneUrl)
    setShowModal(!showModal)
  }

  const handlePrev = () => {
    setCurrentIndex(currentIndex - count)
  }
  const handleNext = () => {
    setDisplayList(sceneList.slice(currentIndex, currentIndex + increment))
    setCurrentIndex(currentIndex + increment)
  }

  const closeSelectedScene = () => {
    setSelectedScene('')
    setShowModal(!showModal)
  }
  console.log(sceneList);
  return (
    <div className="App">
      <div>
      <div>Gallery List</div>
      {/* <List data={sceneList} height={1000} itemHeight={300} itemKey="id" className="mustafa-list">
              {scene => <div key={scene.key}>
                <img className='list-img' alt='scene' height={10}src={scene.url} onClick={()=>handleImgClick(scene.url)}></img>
              </div>}
      </List> */}
      </div>
      <div
        id="gallery-grid"
        // onScroll={handleScroll}
        // style={{ overflow: "scroll", width: "100wh", height: "1100px" }}
      >
        {displayList.map((scene) => {
          return (
            <div key={scene.key}>
              <img
                alt="scene"
                src={scene.url}
                width="200"
                height="200"
              ></img>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={handlePrev}>
          Prev
        </button>
        <button onClick={handleNext}>
          Next
        </button>
      </div>
      <div>
      {showModal && <div className='selected-scene'>
          <button className='close-selected-scene' onClick={closeSelectedScene}>✕</button>
          <img src={selectedScene} alt='selectedImg'></img>
        </div>}
        </div>  
    </div>
  );
}

export default App;
