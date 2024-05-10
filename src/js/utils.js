import ava1 from "/src/icons/ava1.png";
import ava2 from "/src/icons/ava2.png";
import ava3 from "/src/icons/ava3.png";
import ava4 from "/src/icons/ava4.png";

const avaImages = [];
avaImages.push(ava1);
avaImages.push(ava2);
avaImages.push(ava3);
avaImages.push(ava4);

export function getNextImage() {
  const nextIndex = +(Math.random() * 10).toFixed(0) % avaImages.length;
  return avaImages[nextIndex];
}
