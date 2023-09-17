const courseApi = {
  async getCourseDetail() {
    return await Promise.resolve({
      title: "Lập trình C++ cơ bản, nâng cao",
      description:
        "Khóa học lập trình C++ từ cơ bản tới nâng cao dành cho người mới bắt đầu. Mục tiêu của khóa học này nhằm giúp các bạn nắm được các khái niệm căn cơ của lập trình, giúp các bạn có nền tảng vững chắc để chinh phục con đường trở thành một lập trình viên.",
      price: 0,

      units: [
        {
          id: 1,
          title: "Giới thiệu",
          topics: [
            {
              id: 1,
              title: "Giới thiệu khóa học",
              attributes: {
                type: "video",
                length: "210",
              },
            },
            {
              id: 2,
              title: "Cài đặt Dev - C++",
              attributes: {
                type: "video",
                length: "210",
              },
            },
            {
              id: 3,
              title: "Hướng dẫn sử dụng Dev - C++",
              attributes: {
                type: "video",
                length: "210",
              },
            },
          ],
        },
        {
          id: 2,
          title: "Biến và kiểu dữ liệu",
          topics: [
            {
              id: 1,
              title: "Biến và nhập xuất dữ liệu",
              attributes: {
                type: "video",
                length: "210",
              },
            },
            {
              id: 2,
              title: "Biến (variable) là gì?",
              attributes: {
                type: "video",
                length: "210",
              },
            },
            {
              id: 2,
              title: "Kiểu dữ liệu thường gặp",
              attributes: {
                type: "video",
                length: "210",
              },
            },
            {
              id: 2,
              title: "Thực hành sử dụng kiểu dữ liệu",
              attributes: {
                type: "video",
                length: "210",
              },
            },
            {
              id: 2,
              title: "Biến cục bộ và biến toàn cục",
              attributes: {
                type: "video",
                length: "210",
              },
            },
          ],
        },
        {
          id: 3,
          title: "Cấu trúc điều khiển và vòng lặp",
          topics: [
            {
              id: 1,
              title: "Cấu trúc if else",
              attributes: {
                type: "video",
                length: "210",
              },
            },
            {
              id: 2,
              title: "Kiểm tra số chẵn lẻ",
              attributes: {
                type: "video",
                length: "210",
              },
            },
            {
              id: 2,
              title: "Cấu trúc switch case",
              attributes: {
                type: "video",
                length: "210",
              },
            },
            {
              id: 2,
              title: "Thực hành sử dụng kiểu dữ liệu",
              attributes: {
                type: "video",
                length: "210",
              },
            },
            {
              id: 2,
              title: "Chương trình máy tính",
              attributes: {
                type: "video",
                length: "210",
              },
            },
          ],
        },
      ],
      topicsCount: 13,
      unitsCount: 3,
      totalTimeCount: 23342,
    });
  },
};

export default courseApi;
