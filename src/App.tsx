import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight);
  const [dpr, setDpr] = useState<number>(window.devicePixelRatio);
  const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);
  const [screenHeight, setScreenHeight] = useState<number>(window.screen.height);
  // const [footerExpanded, setFooterExpanded] = useState<boolean>(false);

  const doCalcs = () => {
    requestAnimationFrame(() => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      setDpr(window.devicePixelRatio);
      setScreenWidth(window.screen.width);
      setScreenHeight(window.screen.height);
    });
  };

  useEffect(() => {
    window.addEventListener("resize", doCalcs);
    window.addEventListener("orientationchange", doCalcs);

    doCalcs(); // инициализация при загрузке

    return () => {
      window.removeEventListener("resize", doCalcs);
      window.removeEventListener("orientationchange", doCalcs);
    };
  }, []);

  return (
    <section className="App">
      <h1 className="App__title">Ваш viewport в&nbsp;пикселях:</h1>
      <p>(viewport &mdash;&nbsp;область документа или&nbsp;страницы, которую вы&nbsp;видите, не&nbsp;используя прокрутку)</p>
      <p className="Dimensions">
        {viewportWidth}×{viewportHeight}
      </p>
      <hr />
      <div className="Additional">
        <p>
          <span title="Device Pixel Ratio">DPR (это&nbsp;соотношение между физическими пикселями на&nbsp;экране и&nbsp;логическими (CSS) пикселями, используемыми в&nbsp;веб-дизайне)</span>: {dpr.toFixed(2)}
        </p>
        <p>
          Полное разрешение вашего экрана: {screenWidth} × {screenHeight}
        </p>
      </div>
    </section>
  );
}

export default App;