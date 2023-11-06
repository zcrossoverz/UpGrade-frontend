import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { secondsToTime } from "@/utils/convertNumber";
import React from "react";

function CourseContent({
  courseData,
}: {
  courseData:
    | {
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
  return (
    <Accordion type='single' collapsible>
      {courseData?.units.map(({ title, topics }, i) => (
        <AccordionItem value={`unit_${i}`}>
          <AccordionTrigger className='bg-gray-100 h-12 px-8 hover:no-underline border-b border-gray-300 text-lg font-semibold'>
            {title}
          </AccordionTrigger>
          {topics.map((el, i) => (
            <AccordionContent className={`${i == 0 && "pt-4"}`}>
              <div className='flex justify-between'>
                <p className='px-14 text-base font-normal'>{el.title}</p>
                <p className='px-4'>{secondsToTime(Number(el.duration))}</p>
              </div>
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default CourseContent;
