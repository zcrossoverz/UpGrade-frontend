import CourseContainer from "../CourseContainer";
import Slider from "react-slick";

const ListCourse = ({
  title,
  data,
  isEnroll,
}: {
  title: string;
  data: {
    id: number;
    title: string;
    lecturer: string;
    rate: number;
    rate_number: number;
    price: number;
    thumbnail_image: string;
  }[];
  isEnroll: boolean;
}) => {
  return (
    <div>
      <p className='px-32 py-4 text-2xl font-bold'>{title}</p>
      <Slider
        dots={false}
        infinite={true}
        slidesToShow={data?.length >= 5 ? 5 : data?.length}
        slidesToScroll={1}
        swipeToSlide={true}
        className='flex flex-wrap gap-4 justify-center content-center mx-32 pt-0 pb-14'
      >
        {data.map((e, i) => (
          <CourseContainer key={i.toString()} {...e} isEnroll={isEnroll} />
        ))}
      </Slider>
    </div>
  );
};

export default ListCourse;
