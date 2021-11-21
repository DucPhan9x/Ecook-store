import { uuid } from "./stringUtils";

//recipe
export const RECIPES_DATA = [
  {
    id: "a123",
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
    id: "a124",
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
    id: "a125",
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
    id: "a126",
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
    id: "a127",
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
    id: "a128",
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
    unitPrice: 12.023,
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
    unitPrice: 12.023,
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
    unitPrice: 12.023,
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
    unitPrice: 12.023,
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
    unitPrice: 12.023,
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
    unitPrice: 12.023,
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
    unitPrice: 12.023,
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
    unitPrice: 12.023,
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
    unitPrice: 12.023,
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
    unitPrice: 12.023,
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
    unitPrice: 12.023,
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
    id: uuid(),
    name: "Món Á cơ bản",
    price: 700.001,
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    author: "Mr.Duc",
    videoAmount: 5,
  },
  {
    id: uuid(),
    name: "Món Á cơ bản",
    price: 700.001,
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    author: "Mr.Duc",
    videoAmount: 5,
  },
  {
    id: uuid(),
    name: "Món Á cơ bản",
    price: 700.001,
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    author: "Mr.Duc",
    videoAmount: 5,
  },
  {
    id: uuid(),
    name: "Món Á cơ bản",
    price: 700.001,
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    author: "Mr.Duc",
    videoAmount: 5,
  },
  {
    id: uuid(),
    name: "Món Á cơ bản",
    price: 700.001,
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    author: "Mr.Duc",
    videoAmount: 5,
  },
  {
    id: uuid(),
    name: "Món Á cơ bản",
    price: 700.001,
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    author: "Mr.Duc",
    videoAmount: 5,
  },
];

export const INSTRUCTORS_DATA = [
  {
    id: uuid(),
    name: "Phan Trong Duc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    id: uuid(),
    name: "Phan Trong Duc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    id: uuid(),
    name: "Phan Trong Duc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    id: uuid(),
    name: "Phan Trong Duc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    id: uuid(),
    name: "Phan Trong Duc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
  {
    id: uuid(),
    name: "Phan Trong Duc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Mon Chau A",
  },
];
