import { Fragment, useEffect, useRef } from "react";
import Typed from "typed.js";


const TypingAnimation = ({
  selectedProf,
  name
}) => {
  // Create Ref element.
  const el = useRef(null);

  const arr = [];
  for(var i = 0; i< selectedProf?.length; i++){
  arr[i]=selectedProf[i].label;
}

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: arr.length >0 ? arr: [name], // Strings to display
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 100,
      smartBackspace: true,
      loop: true,
      showCursor: true,
    });


    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <Fragment>
      <span id="type-it" className="subtitle subtitle-typed" ref={el}></span>
    </Fragment>
  );
};
export default TypingAnimation;
