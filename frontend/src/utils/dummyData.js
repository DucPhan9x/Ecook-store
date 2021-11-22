import { uuid } from "./stringUtils";

//recipe
export const RECIPES_DATA = [
  {
    _id: "a123",
    title: "Tôm rim",
    feedbacks: 5,
    description: `
    Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng
Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    _id: "a124",
    title: "Tôm rim",
    feedbacks: 5,
    description: `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng
Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    _id: "a125",
    title: "Tôm rim",
    feedbacks: 5,
    description: `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng
Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    _id: "a126",
    title: "Tôm rim",
    feedbacks: 5,
    description: `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng
Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    _id: "a127",
    title: "Tôm rim",
    feedbacks: 5,
    description: `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng
Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    _id: "a128",
    title: "Tôm rim",
    feedbacks: 5,
    description: `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng
Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    imageUrl: "https://picsum.photos/200/300",
  },
];
//food
export const FOODS_DATA = [
  {
    _id: uuid(),
    type: "Thịt Tươi",
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hang tuoi song",
    imageUrl: "https://picsum.photos/200/300",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
  },
  {
    _id: uuid(),
    type: "Thịt Tươi",
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hang tuoi song",
    imageUrl: "https://picsum.photos/200/300",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
  },
  {
    _id: uuid(),
    type: "Thịt Tươi",
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hang tuoi song",
    imageUrl: "https://picsum.photos/200/300",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
  },
  {
    _id: uuid(),
    type: "Thịt Tươi",
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hang tuoi song",
    imageUrl: "https://picsum.photos/200/300",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
  },
  {
    _id: uuid(),
    type: "Thịt Tươi",
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hang tuoi song",
    imageUrl: "https://picsum.photos/200/300",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
  },
  {
    _id: uuid(),
    type: "Thịt Tươi",
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hang tuoi song",
    imageUrl: "https://picsum.photos/200/300",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
  },
  {
    _id: uuid(),
    type: "Thịt Tươi",
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hang tuoi song",
    imageUrl: "https://picsum.photos/200/300",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
  },

  {
    _id: uuid(),
    type: "Thịt Tươi",
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hang tuoi song",
    imageUrl: "https://picsum.photos/200/300",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
  },
  {
    _id: uuid(),
    type: "Thịt Tươi",
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hang tuoi song",
    imageUrl: "https://picsum.photos/200/300",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
  },
  {
    _id: uuid(),
    type: "Thịt Tươi",
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hang tuoi song",
    imageUrl: "https://picsum.photos/200/300",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
  },
  {
    _id: uuid(),
    type: "Thịt Tươi",
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hang tuoi song",
    imageUrl: "https://picsum.photos/200/300",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
  },
];

// course
export const COURSES_DATA = [
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "abcdef",
    examinationContent: "aaaaa",
    regulation: "aaaaaaaaaaaaaaaaaaa",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",
    videoUrls: [
      {
        title: "Mon Chau A",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "abc",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "abcdef",
    examinationContent: "aaaaa",
    regulation: "aaaaaaaaaaaaaaaaaaa",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    videoUrls: [
      {
        title: "Mon Chau A",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "abc",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "abcdef",
    examinationContent: "aaaaa",
    regulation: "aaaaaaaaaaaaaaaaaaa",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    videoUrls: [
      {
        title: "Mon Chau A",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "abc",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "abcdef",
    examinationContent: "aaaaa",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    regulation: "aaaaaaaaaaaaaaaaaaa",
    videoUrls: [
      {
        title: "Mon Chau A",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "abc",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "abcdef",
    examinationContent: "aaaaa",
    regulation: "aaaaaaaaaaaaaaaaaaa",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    videoUrls: [
      {
        title: "Mon Chau A",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "abc",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "abcdef",
    examinationContent: "aaaaa",
    regulation: "aaaaaaaaaaaaaaaaaaa",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    videoUrls: [
      {
        title: "Mon Chau A",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "abc",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "abcdef",
    examinationContent: "aaaaa",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    regulation: "aaaaaaaaaaaaaaaaaaa",
    videoUrls: [
      {
        title: "Mon Chau A",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "abc",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "abcdef",
    examinationContent: "aaaaa",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    regulation: "aaaaaaaaaaaaaaaaaaa",
    videoUrls: [
      {
        title: "Mon Chau A",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "abc",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
];

export const INSTRUCTORS_DATA = [
  {
    _id: uuid(),
    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "abc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "abc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "abc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "abc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "abc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
];

export const EXAMINATIONS_DATA = [
  {
    _id: uuid(),
    courseId: uuid(),
    studentId: uuid(),
    content: "Bò hầm rượu vang",
    criteria:
      "An toàn vệ sinh thực phẩm, trang trí đẹp mắt, thực hiện đúng các bước quy định",
    regulation:
      "Quay qui trình chuẩn bi nguyên liệu, sơ chế và chế biến món ăn theo đề bài được giao. Thời gian quy định 45 phút",
    videoUrlSubmit:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    createdAt: Date.now(),
    isPass: false,
    feedbacks: "Nhan xet ve quy trinh nau an",
    evaluate: "Khong danh gia", // pass -> Gioi/Kha, fail-> Khong danh gia
  },
  {
    _id: uuid(),
    courseId: uuid(),
    studentId: uuid(),
    content: "Bò hầm rượu vang",
    criteria:
      "An toàn vệ sinh thực phẩm, trang trí đẹp mắt, thực hiện đúng các bước quy định",
    regulation:
      "Quay qui trình chuẩn bi nguyên liệu, sơ chế và chế biến món ăn theo đề bài được giao. Thời gian quy định 45 phút",
    videoUrlSubmit:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    createdAt: Date.now(),
    isPass: false,
    feedbacks: "Nhan xet ve quy trinh nau an",
    evaluate: "Khong danh gia", // pass -> Gioi/Kha, fail-> Khong danh gia
  },
  {
    _id: uuid(),
    courseId: uuid(),
    studentId: uuid(),
    content: "Bò hầm rượu vang",
    criteria:
      "An toàn vệ sinh thực phẩm, trang trí đẹp mắt, thực hiện đúng các bước quy định",
    regulation:
      "Quay qui trình chuẩn bi nguyên liệu, sơ chế và chế biến món ăn theo đề bài được giao. Thời gian quy định 45 phút",
    videoUrlSubmit:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    createdAt: Date.now(),
    isPass: false,
    feedbacks: "Nhan xet ve quy trinh nau an",
    evaluate: "Khong danh gia", // pass -> Gioi/Kha, fail-> Khong danh gia
  },
  {
    _id: uuid(),
    courseId: uuid(),
    studentId: uuid(),
    content: "Bò hầm rượu vang",
    criteria:
      "An toàn vệ sinh thực phẩm, trang trí đẹp mắt, thực hiện đúng các bước quy định",
    regulation:
      "Quay qui trình chuẩn bi nguyên liệu, sơ chế và chế biến món ăn theo đề bài được giao. Thời gian quy định 45 phút",
    videoUrlSubmit:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    createdAt: Date.now(),
    isPass: false,
    feedbacks: "Nhan xet ve quy trinh nau an",
    evaluate: "Khong danh gia", // pass -> Gioi/Kha, fail-> Khong danh gia
  },
];
