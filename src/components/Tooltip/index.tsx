/* eslint-disable @typescript-eslint/no-explicit-any */
const Tooltip = ({ content, children }: { content: any; children: any }) => {
  return (
    <div className='relative group inline-block'>
      {children}
      <div
        className='absolute z-50 hidden mt-1 group-hover:block bg-gray-700 text-white py-1 px-2 rounded-lg text-sm transition duration-300'
        style={{ whiteSpace: "nowrap" }}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
