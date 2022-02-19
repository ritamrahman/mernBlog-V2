import React from "react";

function RightSide({ children, width, bg, paddingX, paddingY, marginX, marginY }) {
  return (
    <>
      <aside
        className={`
          ${width ? `w-${width}` : ""} 
          ${bg ? `bg-${bg}` : ""} 
          ${paddingX ? `px-${paddingX}` : ""}
          ${paddingY ? `py-${paddingY}` : ""}
          ${marginX ? `mx-${marginX}` : ""}
          ${marginY ? `my-${marginY}` : ""}
        
        `}
      >
        {children}
      </aside>
    </>
  );
}

export default RightSide;
