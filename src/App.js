import './styles.scss'; 
import React, { useState, useEffect, useCallback} from 'react';
import Heater1 from './music/Q.mp3';
import Heater2 from './music/W.mp3';
import Heater3 from './music/E.mp3';
import Heater4 from './music/A.mp3';
import Clap from './music/S.mp3';
import Open_HH from './music/D.mp3';
import Kick_n_Hat from './music/Z.mp3';
import Kick from './music/X.mp3';
import Closed_HH from './music/C.mp3';

const DrumPad = ({ div_id, letter, audioSrc, setDisplay, volume}) => {
  // callback 避免在每次渲染時都重新創建函數
  const playSound = useCallback(() => {
    const audio = document.querySelector(`audio[id="${letter}"]`);
    const keydiv = document.querySelector(`div[id="${div_id}"]`); 
    if (!audio) return;
    keydiv.classList.add("playing"); 
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
    setDisplay(); 
  },[div_id, letter, audioSrc, setDisplay, volume]);
  // useCallback 的依賴數組應包含所有在 playSound 函數內部使用的變數，以確保只有在這些變數更改時，playSound 才會被重新創建。

  // 按下按鍵
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toUpperCase() === letter) {
        playSound();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [letter, setDisplay, playSound]);

  // 消除樣式
  const removeTransition = (event) => {
    if (event.propertyName !== "transform") return;
    event.target.classList.remove("playing");
  };
  useEffect(() => {
    const keydivs = Array.from(document.querySelectorAll(".drum-pad"));
    keydivs.forEach(keydiv => keydiv.addEventListener("transitionend", removeTransition));
  }, []);

  return (
    <div className="drum-pad" onClick={playSound} id={div_id}>
      <p>{letter}</p>
      <audio className="clip" id={letter} src={audioSrc}></audio>
    </div>
  );
};

const App = () => {
  const [display, setDisplay] = useState("Press.");
  const [volume, setVolume] = useState(0.5);
  // 調整聲音大小
  useEffect(() => {
    const volumeSlider = document.querySelector(".volume-slider input");
    volumeSlider.addEventListener("input", () => {
      const newVolume = parseFloat(volumeSlider.value);
      setVolume(newVolume);
      setDisplay("Volume:" + Math.floor(newVolume*100))
  });
  }, []);

  return (
    <div id="container">
      <div id="drum-machine">
        <div id="display">{display}</div>
        <div className="drum-pads">
          <DrumPad div_id="Heater1" letter="Q" audioSrc={Heater1} setDisplay={() => setDisplay("Heater 1")} volume={volume} />
          <DrumPad div_id="Heater2" letter="W" audioSrc={Heater2} setDisplay={() => setDisplay("Heater 2")} volume={volume} />
          <DrumPad div_id="Heater3" letter="E" audioSrc={Heater3} setDisplay={() => setDisplay("Heater 3")} volume={volume} />
          <DrumPad div_id="Heater4" letter="A" audioSrc={Heater4} setDisplay={() => setDisplay("Heater 4")} volume={volume} />
          <DrumPad div_id="Clap" letter="S" audioSrc={Clap} setDisplay={() => setDisplay("Clap")} volume={volume} />
          <DrumPad div_id="Open_HH" letter="D" audioSrc={Open_HH} setDisplay={() => setDisplay("Open_HH")} volume={volume} />
          <DrumPad div_id="Kick_n_Hat" letter="Z" audioSrc={Kick_n_Hat} setDisplay={() => setDisplay("Kick_n_Hat")} volume={volume} />
          <DrumPad div_id="Kick" letter="X" audioSrc={Kick} setDisplay={() => setDisplay("Kick")} volume={volume} />
          <DrumPad div_id="Closed_HH" letter="C" audioSrc={Closed_HH} setDisplay={() => setDisplay("Closed_HH")} volume={volume} />
        </div>
        <div id="control">
          <div className="volume-slider">
            <input type="range" max="1" min="0" step="0.01" value={volume} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;