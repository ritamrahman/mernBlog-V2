import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

function carousel({ children }) {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="py-5">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default carousel;

// export default class PauseOnHover extends Component {
//   render() {
//     var settings = {
//       dots: true,
//       infinite: true,
//       slidesToShow: 3,
//       slidesToScroll: 1,
//       autoplay: true,
//       autoplaySpeed: 2000,
//       pauseOnHover: true,
//     };
//     return (
//       <div className="py-5">
//         <Slider {...settings}>
//           {post.map((p) => {
//             return <PostCard />;
//           })}
//         </Slider>
//       </div>
//     );
//   }
// }
