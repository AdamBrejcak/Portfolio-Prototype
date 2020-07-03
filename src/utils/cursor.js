import { TweenMax } from "gsap/all";

export default () => {
  const cursor = document.getElementsByClassName("cursor")[0];
  const follower = document.getElementsByClassName("cursor-follower")[0];

  let posX = 0;
  let posY = 0;
  let mouseX = 0;
  let mouseY = 0;

  TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat() {
      posX += (mouseX - posX) / 9;
      posY += (mouseY - posY) / 9;
      TweenMax.set(follower, { css: { left: posX - 12, top: posY - 12 } });
      TweenMax.set(cursor, { css: { left: mouseX, top: mouseY } });
    },
  });

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });
};
