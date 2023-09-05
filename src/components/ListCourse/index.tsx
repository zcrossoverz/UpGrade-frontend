import CourseContainer from "../CourseContainer";
import Slider from "react-slick";

const ListCourse = ({
  title,
  data,
}: {
  title: string;
  data: {
    title: string;
    lecturer: string;
    rate: number;
    rate_number: number;
    price: number;
    thumbnail_image: string;
  }[];
}) => {
  return (
    <div>
      <p className='px-32 py-4 text-2xl font-bold'>{title}</p>
      {/* <div className='flex flex-wrap gap-4 justify-center p-20 pt-0'> */}
      <Slider
        dots={false}
        infinite={true}
        slidesToShow={5}
        slidesToScroll={1}
        swipeToSlide={true}
        className='flex flex-wrap gap-4 justify-center content-center mx-32 pt-0 pb-14'
      >
        {data.map((e, i) => (
          <CourseContainer key={i.toString()} {...e} />
        ))}
      </Slider>
      {/* </div> */}
    </div>
  );
};

export default ListCourse;
