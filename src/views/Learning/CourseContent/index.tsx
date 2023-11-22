import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { secondsToTime } from "@/utils/convertNumber";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CourseContent({
  courseData,
}: {
  courseData:
    | {
        id: number;
        units: {
          id: number;
          title: string;
          topics: {
            id: number;
            title: string;
            video_url: string;
            duration: number;
            description: string;
          }[];
        }[];
      }
    | undefined;
}) {
  const navigate = useNavigate();
  const { topic_id } = useParams();

  const findCurrentUnitIndex = useMemo(() => {
    let index = -1;
    courseData?.units.forEach((unit) => {
      if (unit.topics.some((e) => e.id === Number(topic_id))) {
        index = unit.id;
      }
    });
    return index;
  }, [courseData]);

  return (
    <div>
      <div>
        <div className='w-fullbg-white rounded-lg p-1 md:p-3 m-10'>
          <h3 className='font-semibold text-2xl leading-6 pl-2'>
            Danh sách nội dung
          </h3>
          <div className='px-8 mt-8'>
            <Accordion
              type='single'
              collapsible
              defaultValue={`unit_${Number(findCurrentUnitIndex)}`}
            >
              {courseData?.units.map(({ title, topics, id }) => (
                <AccordionItem value={`unit_${id}`} key={`unit_${id}`}>
                  <AccordionTrigger className='bg-gray-100 h-12 px-8 hover:no-underline border-b border-gray-300 text-lg font-semibold'>
                    {title}
                  </AccordionTrigger>
                  {topics.map((el, i) => (
                    <AccordionContent
                      className={`${i == 0 && "pt-4"}`}
                      key={el.id}
                    >
                      <div className='flex justify-between'>
                        <button
                          className={`px-14 text-base font-normal hover:text-indigo-500 ${
                            el.id === Number(topic_id) &&
                            "text-indigo-500 text-underline cursor-not-allowed"
                          }`}
                          onClick={() =>
                            navigate(`/learning/${courseData?.id}/${el.id}`)
                          }
                          disabled={el.id === Number(topic_id)}
                        >
                          {el.title}
                        </button>
                        <p className='px-4'>{secondsToTime(el.duration)}</p>
                      </div>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseContent;
