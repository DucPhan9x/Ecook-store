import { uuid } from "./stringUtils";

//recipe
export const RECIPES_DATA = [
  {
    _id: "recipe_123",
    title: "Gà xào xả ớt",
    feedbacks: 5,
    contents: [
      `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng.`,
      `Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
`,
      `Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    ],
    material: [
      { _id: uuid(), foodName: "Gà", unit: "kg", quantity: 0.5 },
      { _id: uuid(), foodName: "Xả", unit: "g", quantity: 500 },
      { _id: uuid(), foodName: "Ớt", unit: "g", quantity: 200 },
    ],
    imageUrl: "https://picsum.photos/200/300",
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    feedbacks: 5,
    contents: [
      `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng.`,
      `Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
`,
      `Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    ],
    material: [
      { _id: uuid(), foodName: "Gà", unit: "kg", quantity: 0.5 },
      { _id: uuid(), foodName: "Xả", unit: "g", quantity: 500 },
      { _id: uuid(), foodName: "Ớt", unit: "g", quantity: 200 },
    ],
    imageUrl: "https://picsum.photos/200/300",
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    feedbacks: 5,
    contents: [
      `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng.`,
      `Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
`,
      `Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    ],
    material: [
      { _id: uuid(), foodName: "Gà", unit: "kg", quantity: 0.5 },
      { _id: uuid(), foodName: "Xả", unit: "g", quantity: 500 },
      { _id: uuid(), foodName: "Ớt", unit: "g", quantity: 200 },
    ],
    imageUrl: "https://picsum.photos/200/300",
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    feedbacks: 5,
    contents: [
      `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng.`,
      `Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
`,
      `Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    ],
    material: [
      { _id: uuid(), foodName: "Gà", unit: "kg", quantity: 0.5 },
      { _id: uuid(), foodName: "Xả", unit: "g", quantity: 500 },
      { _id: uuid(), foodName: "Ớt", unit: "g", quantity: 200 },
    ],
    imageUrl: "https://picsum.photos/200/300",
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    feedbacks: 5,
    contents: [
      `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng.`,
      `Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
`,
      `Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    ],
    material: [
      { _id: uuid(), foodName: "Gà", unit: "kg", quantity: 0.5 },
      { _id: uuid(), foodName: "Xả", unit: "g", quantity: 500 },
      { _id: uuid(), foodName: "Ớt", unit: "g", quantity: 200 },
    ],
    imageUrl: "https://picsum.photos/200/300",
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    feedbacks: 5,
    contents: [
      `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng.`,
      `Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
`,
      `Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    ],
    material: [
      { _id: uuid(), foodName: "Gà", unit: "kg", quantity: 0.5 },
      { _id: uuid(), foodName: "Xả", unit: "g", quantity: 500 },
      { _id: uuid(), foodName: "Ớt", unit: "g", quantity: 200 },
    ],
    imageUrl: "https://picsum.photos/200/300",
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    feedbacks: 5,
    contents: [
      `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng.`,
      `Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
`,
      `Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    ],
    material: [
      { _id: uuid(), foodName: "Gà", unit: "kg", quantity: 0.5 },
      { _id: uuid(), foodName: "Xả", unit: "g", quantity: 500 },
      { _id: uuid(), foodName: "Ớt", unit: "g", quantity: 200 },
    ],
    imageUrl: "https://picsum.photos/200/300",
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    feedbacks: 5,
    contents: [
      `Bước 1:
Rã đông sản phẩm ở nhiệt độ phòng.`,
      `Bước 2:
Đặt nồi lên bếp, cho tôm thẻ rim mặn (ướp sẵn) vào nồi đảo nhẹ 2-3 phút cho săn, tiếp đến cho 200ml nước lọc vào nồi (lấy phần nước này cho vào hộp tôm để lấy hết phần sốt ướp trong hộp). Kho trên lửa nhỏ đến khi nước kho sệt lại, nêm nếm cho vừa ăn rồi tắt bếp
`,
      `Bước 3:
Bày món ăn ra dĩa và thưởng thức. Ngon hơn khi ăn nóng cùng cơm trắng.`,
    ],
    material: [
      { _id: uuid(), foodName: "Gà", unit: "kg", quantity: 0.5 },
      { _id: uuid(), foodName: "Xả", unit: "g", quantity: 500 },
      { _id: uuid(), foodName: "Ớt", unit: "g", quantity: 200 },
    ],
    imageUrl: "https://picsum.photos/200/300",
    createAt: Date.now(),
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
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
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
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
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
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
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
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
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
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
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
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
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
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
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
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
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
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  },
];

export const INSTRUCTORS_DATA = [
  {
    _id: uuid(),
    role: "instructor",
    fullName: "Phan Trong Duc",
    email: "duc@gmail.com",
    phoneNumber: "0987675646",
    address: "TT.La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    role: "instructor",
    fullName: "Phan Trong Duc",
    email: "duc@gmail.com",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    role: "instructor",
    fullName: "Phan Trong Duc",
    email: "duc@gmail.com",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    role: "instructor",
    fullName: "Phan Trong Duc",
    email: "duc@gmail.com",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    role: "instructor",
    fullName: "Phan Trong Duc",
    email: "duc@gmail.com",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    role: "instructor",
    fullName: "Phan Trong Duc",
    email: "duc@gmail.com",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    role: "instructor",
    fullName: "Phan Trong Duc",
    email: "duc@gmail.com",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    role: "instructor",
    fullName: "Phan Trong Duc",
    email: "duc@gmail.com",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    _id: uuid(),
    role: "instructor",
    fullName: "Phan Trong Duc",
    email: "duc@gmail.com",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
];

export const EMPLOYEES_DATA = [
  {
    _id: uuid(),
    role: "employee",
    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    email: "duc@gmail.com",

    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
  },
  {
    _id: uuid(),
    role: "employee",
    email: "duc@gmail.com",

    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
  },
  {
    _id: uuid(),
    role: "employee",
    email: "duc@gmail.com",

    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
  },
  {
    _id: uuid(),
    role: "employee",
    email: "duc@gmail.com",

    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
  },
  {
    _id: uuid(),
    role: "employee",
    email: "duc@gmail.com",

    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
  },
  {
    _id: uuid(),
    role: "employee",
    email: "duc@gmail.com",

    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
  },
  {
    _id: uuid(),
    role: "employee",
    email: "duc@gmail.com",

    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
  },
  {
    _id: uuid(),
    role: "employee",
    email: "duc@gmail.com",

    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
  },
  {
    _id: uuid(),
    role: "employee",
    email: "duc@gmail.com",

    fullName: "Phan Trong Duc",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
  },
];

export const EXAMINATIONS_DATA = [
  {
    _id: uuid(),
    courseId: uuid(),
    studentId: uuid(),
    student: {
      email: "duc@gmail.com",

      fullName: "Phan Trong Duc",
      phoneNumber: "0987675646",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    },
    content: "Bò hầm rượu vang",
    criteria:
      "An toàn vệ sinh thực phẩm, trang trí đẹp mắt, thực hiện đúng các bước quy định",
    regulation:
      "Quay qui trình chuẩn bi nguyên liệu, sơ chế và chế biến món ăn theo đề bài được giao. Thời gian quy định 45 phút",
    videoUrlSubmit:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    createdAt: Date.now(),
    isPass: false,
    feedbacks: "",
    evaluate: "Khong danh gia", // pass -> Gioi/Kha, fail-> Khong danh gia
  },
  {
    _id: uuid(),
    courseId: uuid(),
    studentId: uuid(),
    student: {
      email: "duc@gmail.com",

      fullName: "Phan Trong Duc",
      phoneNumber: "0987675646",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    },
    content: "Bò hầm rượu vang",
    criteria:
      "An toàn vệ sinh thực phẩm, trang trí đẹp mắt, thực hiện đúng các bước quy định",
    regulation:
      "Quay qui trình chuẩn bi nguyên liệu, sơ chế và chế biến món ăn theo đề bài được giao. Thời gian quy định 45 phút",
    videoUrlSubmit:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    createdAt: Date.now(),
    isPass: false,
    feedbacks: "",
    evaluate: "Khong danh gia", // pass -> Gioi/Kha, fail-> Khong danh gia
  },
  {
    _id: uuid(),
    courseId: uuid(),
    studentId: uuid(),
    student: {
      email: "duc@gmail.com",

      fullName: "Phan Trong Duc",
      phoneNumber: "0987675646",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    },
    content: "Bò hầm rượu vang",
    criteria:
      "An toàn vệ sinh thực phẩm, trang trí đẹp mắt, thực hiện đúng các bước quy định",
    regulation:
      "Quay qui trình chuẩn bi nguyên liệu, sơ chế và chế biến món ăn theo đề bài được giao. Thời gian quy định 45 phút",
    videoUrlSubmit:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    createdAt: Date.now(),
    isPass: false,
    feedbacks: "",
    evaluate: "Khong danh gia", // pass -> Gioi/Kha, fail-> Khong danh gia
  },
  {
    _id: uuid(),
    courseId: uuid(),
    studentId: uuid(),
    student: {
      email: "duc@gmail.com",

      fullName: "Phan Trong Duc",
      phoneNumber: "0987675646",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    },
    content: "Bò hầm rượu vang",
    criteria:
      "An toàn vệ sinh thực phẩm, trang trí đẹp mắt, thực hiện đúng các bước quy định",
    regulation:
      "Quay qui trình chuẩn bi nguyên liệu, sơ chế và chế biến món ăn theo đề bài được giao. Thời gian quy định 45 phút",
    videoUrlSubmit:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    createdAt: Date.now(),
    isPass: false,
    feedbacks: "",
    evaluate: "Khong danh gia", // pass -> Gioi/Kha, fail-> Khong danh gia
  },
];

export const CUSTOMERS_DATA = [
  {
    _id: uuid(),
    fullName: "Phan Trong Duc",
    dateOfBirth: Date.now(),
    email: "trongduc@gmail.com",
    phoneNumber: "09873678265",
    address: "TT.La Hai - H.Dong Xuan - T. Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
  },
  {
    _id: uuid(),
    fullName: "Phan Trong Duc",
    dateOfBirth: Date.now(),
    email: "trongduc@gmail.com",
    phoneNumber: "09873678265",
    address: "TT.La Hai - H.Dong Xuan - T. Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
  },
  {
    _id: uuid(),
    fullName: "Phan Trong Duc",
    dateOfBirth: Date.now(),
    email: "trongduc@gmail.com",
    phoneNumber: "09873678265",
    address: "TT.La Hai - H.Dong Xuan - T. Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
  },
];

export const CERTIFICATIONS_DATA = [
  {
    _id: uuid(),
    student: {
      fullName: "Phan Trong Duc",
    },
    course: {
      courseName: "Mon Chau A",
    },
    startDate: Date.now(),
    endDate: Date.now(),
    createAt: Date.now(),
    positionCreate: "Da Nang",
  },
  {
    _id: uuid(),
    student: {
      fullName: "Phan Trong Duc",
    },
    course: {
      courseName: "Mon Chau A",
    },
    startDate: Date.now(),
    endDate: Date.now(),
    createAt: Date.now(),
    positionCreate: "Da Nang",
  },
  {
    _id: uuid(),
    student: {
      fullName: "Phan Trong Duc",
    },
    course: {
      courseName: "Mon Chau A",
    },
    startDate: Date.now(),
    endDate: Date.now(),
    createAt: Date.now(),
    positionCreate: "Da Nang",
  },
  {
    _id: uuid(),
    student: {
      fullName: "Phan Trong Duc",
    },
    course: {
      courseName: "Mon Chau A",
    },
    startDate: Date.now(),
    endDate: Date.now(),
    createAt: Date.now(),
    positionCreate: "Da Nang",
  },
];

export const ORDERS_DATA = [
  {
    _id: uuid(),
    customers: {},
    employee: {},
    createdAt: Date.now(),
    address: "62/07 Dong Ke - Hoa Khanh Bac - Lien Chieu - Da Nang",
    orderStatus: {
      id: 1,
      description: "Chua nhan giao",
    },
    paymentMethod: "Truc tiep or Momo",
    shipmentFee: 5000,
    merchandiseSubtotal: 20000, // tien san pham chua tinh ship
    total: 25000,
    items: [
      {
        _id: uuid(),
        food: {
          _id: uuid(),
          name: "Cam",
        },
        unitPrice: 20000,
        unitType: "kg",
        quantity: 0.5,
      },
    ],
  },
];
