import { uuid } from "./stringUtils";
import GaXaoXaOt from "assets/recipes/ga_xao_xa_ot.jpg";
import ECookIcon from "assets/images/logoECook.png";

//recipe
export const RECIPES_DATA = [
  {
    _id: "recipe_123",
    title: "Gà xào xả ớt",
    feedbacks: 3, //trung binh cong all feedbacks
    quantitatif: 5, // so nguoi an
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
    imageUrl: GaXaoXaOt,
    createAt: Date.now(),
    feedbacksList: [
      {
        _id: "feedback_123",
        itemId: "recipe_123", // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: "feedback_123",
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    quantitatif: 5, // so nguoi an
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
    imageUrl: GaXaoXaOt,
    createAt: Date.now(),
    feedbacksList: [
      {
        _id: "feedback_123",
        itemId: "recipe_123", // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    quantitatif: 5, // so nguoi an
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
    imageUrl: GaXaoXaOt,
    createAt: Date.now(),
    feedbacksList: [
      {
        _id: "feedback_123",
        itemId: "recipe_123", // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    quantitatif: 5, // so nguoi an
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
    imageUrl: GaXaoXaOt,
    createAt: Date.now(),
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    quantitatif: 5, // so nguoi an
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
    imageUrl: GaXaoXaOt,
    createAt: Date.now(),
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    quantitatif: 5, // so nguoi an
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
    imageUrl: GaXaoXaOt,
    createAt: Date.now(),
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    quantitatif: 5, // so nguoi an
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
    imageUrl: GaXaoXaOt,
    createAt: Date.now(),
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    title: "Gà xào xả ớt",
    quantitatif: 5, // so nguoi an
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
    imageUrl: GaXaoXaOt,
    createAt: Date.now(),
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
];
//food
export const FOODS_DATA = [
  {
    _id: uuid(),
    type: "Thịt",
    unit: "kg",
    quantity: 1,
    name: "Sườn Non Heo",
    unitPrice: 120000,
    discountOff: 20, // percent %,
    discountMaximum: 20000, //vnd
    description: "Hàng tươi sống",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
    numOfStars: 5,
    numOfFeedbacks: 12, // feedbacks.length
    createAt: Date.now(),
    updateAt: Date.now(),
    isRemoveTemp: false,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: uuid, // user feedback
          fullName: "Van Anh",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    recipesRelated: [
      {
        _id: uuid(),
        title: "Sườn xào chua ngọt",
        quantitatif: 5, // so nguoi an
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
        imageUrl: GaXaoXaOt,
        createAt: Date.now(),
        feedbacksList: [
          {
            _id: "feedback_123",
            itemId: "recipe_123", // recipe id
            user: {
              userId: "user_1", // user feedback
              fullName: "Phan Trong Duc",
              imageUrl:
                "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
            },
            numOfStars: 4,
            content: "Cong thuc hay qua",
            createdAt: Date.now(),
            feedbackType: 1, // 1: recipe, 2: food, 3:course
            reply: [
              // Reply cua he thong, phan hoi lai khach hang
              {
                _id: uuid(),
                feedbackId: uuid(),
                user: {
                  _id: uuid(),
                  imageUrl: ECookIcon,
                },
                content: "Cam on ban da phan hoi",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    type: "Thịt",
    unit: "kg",
    quantity: 1,
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hàng tươi sống",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
    numOfStars: 5,
    numOfFeedbacks: 12,
    discountOff: 20, // percent %,
    discountMaximum: 20000, //vnd
    createAt: Date.now(),
    updateAt: Date.now(),
    isRemoveTemp: false,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    recipesRelated: [
      {
        _id: uuid(),
        title: "Sườn xào chua ngọt",
        quantitatif: 5, // so nguoi an
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
        imageUrl: GaXaoXaOt,
        createAt: Date.now(),
        feedbacksList: [
          {
            _id: "feedback_123",
            itemId: "recipe_123", // recipe id
            user: {
              userId: "user_1", // user feedback
              fullName: "Phan Trong Duc",
              imageUrl:
                "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
            },
            numOfStars: 4,
            content: "Cong thuc hay qua",
            createdAt: Date.now(),
            feedbackType: 1, // 1: recipe, 2: food, 3:course
            reply: [
              // Reply cua he thong, phan hoi lai khach hang
              {
                _id: uuid(),
                feedbackId: uuid(),
                user: {
                  _id: uuid(),
                  imageUrl: ECookIcon,
                },
                content: "Cam on ban da phan hoi",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    type: "Thịt",
    unit: "kg",
    quantity: 1,
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hàng tươi sống",
    discountOff: 20, // percent %,
    discountMaximum: 20000, //vnd
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
    isRemoveTemp: false,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    recipesRelated: [
      {
        _id: uuid(),
        title: "Sườn xào chua ngọt",
        quantitatif: 5, // so nguoi an
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
        imageUrl: GaXaoXaOt,
        createAt: Date.now(),
        feedbacksList: [
          {
            _id: "feedback_123",
            itemId: "recipe_123", // recipe id
            user: {
              userId: "user_1", // user feedback
              fullName: "Phan Trong Duc",
              imageUrl:
                "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
            },
            numOfStars: 4,
            content: "Cong thuc hay qua",
            createdAt: Date.now(),
            feedbackType: 1, // 1: recipe, 2: food, 3:course
            reply: [
              // Reply cua he thong, phan hoi lai khach hang
              {
                _id: uuid(),
                feedbackId: uuid(),
                user: {
                  _id: uuid(),
                  imageUrl: ECookIcon,
                },
                content: "Cam on ban da phan hoi",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    type: "Thịt",
    unit: "kg",
    quantity: 1,
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hàng tươi sống",
    discountOff: 20, // percent %,
    discountMaximum: 20000, //vnd
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
    isRemoveTemp: false,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    recipesRelated: [
      {
        _id: uuid(),
        title: "Sườn xào chua ngọt",
        quantitatif: 5, // so nguoi an
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
        imageUrl: GaXaoXaOt,
        createAt: Date.now(),
        feedbacksList: [
          {
            _id: "feedback_123",
            itemId: "recipe_123", // recipe id
            user: {
              userId: "user_1", // user feedback
              fullName: "Phan Trong Duc",
              imageUrl:
                "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
            },
            numOfStars: 4,
            content: "Cong thuc hay qua",
            createdAt: Date.now(),
            feedbackType: 1, // 1: recipe, 2: food, 3:course
            reply: [
              // Reply cua he thong, phan hoi lai khach hang
              {
                _id: uuid(),
                feedbackId: uuid(),
                user: {
                  _id: uuid(),
                  imageUrl: ECookIcon,
                },
                content: "Cam on ban da phan hoi",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    type: "Thịt",
    unit: "kg",
    quantity: 1,
    name: "Sườn Non Heo",
    unitPrice: 120000,
    discountOff: 20, // percent %,
    discountMaximum: 20000, //vnd
    description: "Hàng tươi sống",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
    isRemoveTemp: false,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    recipesRelated: [
      {
        _id: uuid(),
        title: "Sườn xào chua ngọt",
        quantitatif: 5, // so nguoi an
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
        imageUrl: GaXaoXaOt,
        createAt: Date.now(),
        feedbacksList: [
          {
            _id: "feedback_123",
            itemId: "recipe_123", // recipe id
            user: {
              userId: "user_1", // user feedback
              fullName: "Phan Trong Duc",
              imageUrl:
                "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
            },
            numOfStars: 4,
            content: "Cong thuc hay qua",
            createdAt: Date.now(),
            feedbackType: 1, // 1: recipe, 2: food, 3:course
            reply: [
              // Reply cua he thong, phan hoi lai khach hang
              {
                _id: uuid(),
                feedbackId: uuid(),
                user: {
                  _id: uuid(),
                  imageUrl: ECookIcon,
                },
                content: "Cam on ban da phan hoi",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    type: "Thịt",
    unit: "kg",
    quantity: 1,
    name: "Sườn Non Heo",
    unitPrice: 120000,
    discountOff: 20, // percent %,
    discountMaximum: 20000, //vnd
    description: "Hàng tươi sống",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
    isRemoveTemp: false,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    recipesRelated: [
      {
        _id: uuid(),
        title: "Sườn xào chua ngọt",
        quantitatif: 5, // so nguoi an
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
        imageUrl: GaXaoXaOt,
        createAt: Date.now(),
        feedbacksList: [
          {
            _id: "feedback_123",
            itemId: "recipe_123", // recipe id
            user: {
              userId: "user_1", // user feedback
              fullName: "Phan Trong Duc",
              imageUrl:
                "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
            },
            numOfStars: 4,
            content: "Cong thuc hay qua",
            createdAt: Date.now(),
            feedbackType: 1, // 1: recipe, 2: food, 3:course
            reply: [
              // Reply cua he thong, phan hoi lai khach hang
              {
                _id: uuid(),
                feedbackId: uuid(),
                user: {
                  _id: uuid(),
                  imageUrl: ECookIcon,
                },
                content: "Cam on ban da phan hoi",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    type: "Thịt",
    unit: "kg",
    quantity: 1,
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hàng tươi sống",
    discountOff: 20, // percent %,
    discountMaximum: 20000, //vnd
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
    isRemoveTemp: false,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    recipesRelated: [
      {
        _id: uuid(),
        title: "Sườn xào chua ngọt",
        quantitatif: 5, // so nguoi an
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
        imageUrl: GaXaoXaOt,
        createAt: Date.now(),
        feedbacksList: [
          {
            _id: "feedback_123",
            itemId: "recipe_123", // recipe id
            user: {
              userId: "user_1", // user feedback
              fullName: "Phan Trong Duc",
              imageUrl:
                "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
            },
            numOfStars: 4,
            content: "Cong thuc hay qua",
            createdAt: Date.now(),
            feedbackType: 1, // 1: recipe, 2: food, 3:course
            reply: [
              // Reply cua he thong, phan hoi lai khach hang
              {
                _id: uuid(),
                feedbackId: uuid(),
                user: {
                  _id: uuid(),
                  imageUrl: ECookIcon,
                },
                content: "Cam on ban da phan hoi",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    _id: uuid(),
    type: "Thịt",
    unit: "kg",
    quantity: 1,
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hàng tươi sống",
    discountOff: 20, // percent %,
    discountMaximum: 20000, //vnd
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
    isRemoveTemp: false,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    recipesRelated: [
      {
        _id: uuid(),
        title: "Sườn xào chua ngọt",
        quantitatif: 5, // so nguoi an
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
        imageUrl: GaXaoXaOt,
        createAt: Date.now(),
        feedbacksList: [
          {
            _id: "feedback_123",
            itemId: "recipe_123", // recipe id
            user: {
              userId: "user_1", // user feedback
              fullName: "Phan Trong Duc",
              imageUrl:
                "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
            },
            numOfStars: 4,
            content: "Cong thuc hay qua",
            createdAt: Date.now(),
            feedbackType: 1, // 1: recipe, 2: food, 3:course
            reply: [
              // Reply cua he thong, phan hoi lai khach hang
              {
                _id: uuid(),
                feedbackId: uuid(),
                user: {
                  _id: uuid(),
                  imageUrl: ECookIcon,
                },
                content: "Cam on ban da phan hoi",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    type: "Thịt",
    unit: "kg",
    quantity: 1,
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hàng tươi sống",
    discountOff: 20, // percent %,
    discountMaximum: 20000, //vnd
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
    isRemoveTemp: false,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    recipesRelated: [
      {
        _id: uuid(),
        title: "Sườn xào chua ngọt",
        quantitatif: 5, // so nguoi an
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
        imageUrl: GaXaoXaOt,
        createAt: Date.now(),
        feedbacksList: [
          {
            _id: "feedback_123",
            itemId: "recipe_123", // recipe id
            user: {
              userId: "user_1", // user feedback
              fullName: "Phan Trong Duc",
              imageUrl:
                "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
            },
            numOfStars: 4,
            content: "Cong thuc hay qua",
            createdAt: Date.now(),
            feedbackType: 1, // 1: recipe, 2: food, 3:course
            reply: [
              // Reply cua he thong, phan hoi lai khach hang
              {
                _id: uuid(),
                feedbackId: uuid(),
                user: {
                  _id: uuid(),
                  imageUrl: ECookIcon,
                },
                content: "Cam on ban da phan hoi",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    type: "Thịt",
    unit: "kg",
    quantity: 1,
    name: "Sườn Non Heo",
    unitPrice: 120000,
    description: "Hàng tươi sống",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
    numOfStars: 5,
    discountOff: 20, // percent %,
    discountMaximum: 20000, //vnd
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
    isRemoveTemp: false,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    recipesRelated: [
      {
        _id: uuid(),
        title: "Sườn xào chua ngọt",
        quantitatif: 5, // so nguoi an
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
        imageUrl: GaXaoXaOt,
        createAt: Date.now(),
        feedbacksList: [
          {
            _id: "feedback_123",
            itemId: "recipe_123", // recipe id
            user: {
              userId: "user_1", // user feedback
              fullName: "Phan Trong Duc",
              imageUrl:
                "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
            },
            numOfStars: 4,
            content: "Cong thuc hay qua",
            createdAt: Date.now(),
            feedbackType: 1, // 1: recipe, 2: food, 3:course
            reply: [
              // Reply cua he thong, phan hoi lai khach hang
              {
                _id: uuid(),
                feedbackId: uuid(),
                user: {
                  _id: uuid(),
                  imageUrl: ECookIcon,
                },
                content: "Cam on ban da phan hoi",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    type: "Thịt",
    unit: "kg",
    quantity: 1,
    name: "Sườn Non Heo",
    unitPrice: 120000,
    discountOff: 20, // percent %,
    discountMaximum: 20000, //vnd
    description: "Hàng tươi sống",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
    numOfStars: 5,
    numOfFeedbacks: 12,
    createAt: Date.now(),
    updateAt: Date.now(),
    isRemoveTemp: false,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    recipesRelated: [
      {
        _id: uuid(),
        title: "Sườn xào chua ngọt",
        quantitatif: 5, // so nguoi an
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
        imageUrl: GaXaoXaOt,
        createAt: Date.now(),
        feedbacksList: [
          {
            _id: "feedback_123",
            itemId: "recipe_123", // recipe id
            user: {
              userId: "user_1", // user feedback
              fullName: "Phan Trong Duc",
              imageUrl:
                "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
            },
            numOfStars: 4,
            content: "Cong thuc hay qua",
            createdAt: Date.now(),
            feedbackType: 1, // 1: recipe, 2: food, 3:course
            reply: [
              // Reply cua he thong, phan hoi lai khach hang
              {
                _id: uuid(),
                feedbackId: uuid(),
                user: {
                  _id: uuid(),
                  imageUrl: ECookIcon,
                },
                content: "Cam on ban da phan hoi",
              },
            ],
          },
        ],
      },
    ],
  },
];

// course
export const COURSES_DATA = [
  {
    _id: "course_123",
    name: "Món Á cơ bản",
    numOfStars: 4,
    unitPrice: 650000,
    discountOff: 10,
    discountMaximum: 100000,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",
    videoUrls: [
      {
        title: "Món Châu Âu",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: 30, // unit : min
      },
    ],
    instructor: {
      _id: "instructor_123",
      fullName: "Duc Trong",
      phoneNumber: "0984763232",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    amountStudent: 12,
    createAt: Date.now(),
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    numOfStars: 4,
    unitPrice: 650000,
    discountOff: 10,
    discountMaximum: 100000,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",
    videoUrls: [
      {
        title: "Món Châu Âu",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      _id: uuid(),
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
    amountStudent: 12,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            feedbackId: uuid(),
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    numOfStars: 4,
    unitPrice: 650000,
    discountOff: 10,
    discountMaximum: 100000,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    videoUrls: [
      {
        title: "Món Châu Âu",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      _id: uuid(),
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
    amountStudent: 12,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            feedbackId: uuid(),
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    numOfStars: 4,
    unitPrice: 650000,
    discountOff: 10,
    discountMaximum: 100000,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
    videoUrls: [
      {
        title: "Món Châu Âu",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      _id: uuid(),
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
    amountStudent: 12,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            feedbackId: uuid(),
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    numOfStars: 4,
    unitPrice: 650000,
    discountOff: 10,
    discountMaximum: 100000,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    videoUrls: [
      {
        title: "Món Châu Âu",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      _id: uuid(),
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
    amountStudent: 12,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            feedbackId: uuid(),
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    numOfStars: 4,
    unitPrice: 650000,
    discountOff: 10,
    discountMaximum: 100000,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    videoUrls: [
      {
        title: "Món Châu Âu",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      _id: uuid(),
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
    amountStudent: 12,
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    numOfStars: 4,
    unitPrice: 650000,
    discountOff: 10,
    discountMaximum: 100000,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
    videoUrls: [
      {
        title: "Món Châu Âu",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      _id: uuid(),
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
    amountStudent: 12,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            feedbackId: uuid(),
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
  {
    _id: uuid(),
    name: "Món Á cơ bản",
    numOfStars: 4,
    unitPrice: 650000,
    discountOff: 10,
    discountMaximum: 100000,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",

    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
    videoUrls: [
      {
        title: "Món Châu Âu",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      _id: uuid(),
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
    amountStudent: 12,
    feedbacksList: [
      {
        _id: uuid(),
        itemId: uuid(), // recipe id
        user: {
          userId: "user_1", // user feedback
          fullName: "Phan Trong Duc",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
        },
        numOfStars: 4,
        content: "Cong thuc hay qua",
        createdAt: Date.now(),
        feedbackType: 1, // 1: recipe, 2: food, 3:course
        reply: [
          // Reply cua he thong, phan hoi lai khach hang
          {
            _id: uuid(),
            feedbackId: uuid(),
            user: {
              _id: uuid(),
              imageUrl: ECookIcon,
            },
            content: "Cam on ban da phan hoi",
          },
        ],
      },
    ],
  },
];

export const INSTRUCTORS_DATA = [
  {
    _id: "instructor_123",
    role: "instructor",
    fullName: "Duc Trong",
    email: "duc@gmail.com",
    phoneNumber: "0987675646",
    address: "TT.La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Món Châu Âu",
  },
  {
    _id: uuid(),
    role: "instructor",
    fullName: "Duc Trong",
    email: "duc@gmail.com",
    phoneNumber: "0987675646",
    address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    feedbacks: 5,
    expertise: "Món Châu Âu",
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
    expertise: "Món Châu Âu",
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
    expertise: "Món Châu Âu",
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
    expertise: "Món Châu Âu",
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
    expertise: "Món Châu Âu",
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
    expertise: "Món Châu Âu",
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
    expertise: "Món Châu Âu",
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
    expertise: "Món Châu Âu",
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
    isBlock: false,
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
    isBlock: false,

    address: "TT.La Hai - H.Dong Xuan - T. Phu Yen",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
  },
  {
    _id: uuid(),
    fullName: "Phan Trong Duc",
    dateOfBirth: Date.now(),
    email: "trongduc@gmail.com",
    isBlock: false,

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
      dayOfBirth: Date.now(),
      imageUrl:
        "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    },
    course: {
      courseName: "Món Châu Âu",
    },
    startDate: Date.now(),
    endDate: Date.now(),
    createAt: Date.now(),
    positionCreate: "Da Nang",
    evaluate: "Gioi",
  },
  {
    _id: uuid(),
    student: {
      fullName: "Phan Trong Duc",
      dayOfBirth: Date.now(),
      imageUrl:
        "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    },
    course: {
      courseName: "Món Châu Âu",
    },
    startDate: Date.now(),
    endDate: Date.now(),
    createAt: Date.now(),
    positionCreate: "Da Nang",
    evaluate: "Gioi",
  },
  {
    _id: uuid(),
    student: {
      fullName: "Phan Trong Duc",
      dayOfBirth: Date.now(),
      imageUrl:
        "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    },
    course: {
      courseName: "Món Châu Âu",
    },
    startDate: Date.now(),
    endDate: Date.now(),
    createAt: Date.now(),
    evaluate: "Gioi",

    positionCreate: "Da Nang",
  },
  {
    _id: uuid(),
    student: {
      fullName: "Phan Trong Duc",
      dayOfBirth: Date.now(),
      imageUrl:
        "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    },
    course: {
      courseName: "Món Châu Âu",
    },
    startDate: Date.now(),
    endDate: Date.now(),
    createAt: Date.now(),
    evaluate: "Gioi",
    positionCreate: "Da Nang",
  },
];

export const ORDERS_DATA = [
  {
    _id: uuid(),
    customer: {
      _id: uuid(),
      name: "Phan Trong Duc",
      email: "trongduc@gmail.com",
      phoneNumber: "0987675646",
      imageUrl:
        "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    },
    employee: {},
    createdAt: Date.now(),
    address: "62/07 Đồng Kè - Hòa Khánh Bắc - Liên Chiểu - Đà Nẵng",
    orderStatus: {
      id: 1,
      description: "Chưa giao hàng",
    },
    isPaid: true,
    paymentMethod: "Tiền mặt", // Momo
    shipmentFee: 5000, // tinh theo dia chi dat don mua
    merchandiseSubtotal: 20000, // tien san pham chua tinh ship
    total: 25000, // tong tien bao gom ship fee
    voucher: {
      _id: uuid(),
      name: "VUIVECUOITUAN",
      discount: "15000",
    },
    items: [
      {
        _id: uuid(),
        foodId: uuid(), // to see details the other information
        foodName: "Cam",
        unitPrice: 20000,
        unitType: "kg",
        quantity: 0.5,
      },
    ],
  },
  {
    _id: uuid(),
    customer: {
      _id: uuid(),
      name: "Phan Trong Duc",
      email: "trongduc@gmail.com",
      phoneNumber: "0987675646",
      imageUrl:
        "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    },
    isPaid: true,
    employee: {},
    createdAt: Date.now(),
    address: "62/07 Đồng Kè - Hòa Khánh Bắc - Liên Chiểu - Đà Nẵng",
    orderStatus: {
      id: 1,
      description: "Chưa giao hàng",
    },
    paymentMethod: "Tiền mặt", // Momo
    shipmentFee: 5000, // tinh theo dia chi dat don mua
    merchandiseSubtotal: 20000, // tien san pham chua tinh ship
    total: 25000, // tong tien bao gom ship fee
    voucher: {
      _id: uuid(),
      name: "VUIVECUOITUAN",
      discount: "15000",
    },
    items: [
      {
        _id: uuid(),
        foodId: uuid(), // to see details the other information
        foodName: "Cam",
        unitPrice: 20000,
        unitType: "kg",
        quantity: 0.5,
      },
    ],
  },
  {
    _id: uuid(),
    customer: {
      _id: uuid(),
      name: "Phan Trong Duc",
      email: "trongduc@gmail.com",
      phoneNumber: "0987675646",
      imageUrl:
        "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    },
    employee: {},
    isPaid: true,
    createdAt: Date.now(),
    address: "62/07 Đồng Kè - Hòa Khánh Bắc - Liên Chiểu - Đà Nẵng",
    orderStatus: {
      id: 1,
      description: "Chưa giao hàng",
    },
    paymentMethod: "Tiền mặt", // Momo
    shipmentFee: 5000, // tinh theo dia chi dat don mua
    merchandiseSubtotal: 20000, // tien san pham chua tinh ship
    total: 25000, // tong tien bao gom ship fee
    voucher: {
      _id: uuid(),
      name: "VUIVECUOITUAN",
      discount: "15000",
    },
    items: [
      {
        _id: uuid(),
        foodId: uuid(), // to see details the other information
        foodName: "Cam",
        unitPrice: 20000,
        unitType: "kg",
        quantity: 0.5,
      },
    ],
  },
  {
    _id: uuid(),
    customer: {
      _id: uuid(),
      name: "Phan Trong Duc",
      email: "trongduc@gmail.com",
      phoneNumber: "0987675646",
      imageUrl:
        "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    },
    employee: {},
    isPaid: true,
    createdAt: Date.now(),
    address: "62/07 Đồng Kè - Hòa Khánh Bắc - Liên Chiểu - Đà Nẵng",
    orderStatus: {
      id: 1,
      description: "Chưa giao hàng",
    },
    paymentMethod: "Tiền mặt", // Momo
    shipmentFee: 5000, // tinh theo dia chi dat don mua
    merchandiseSubtotal: 10000, // tien san pham chua tinh ship
    total: 25000, // tong tien bao gom ship fee
    voucher: {
      _id: uuid(),
      name: "VUIVECUOITUAN",
      discount: "15000",
    },
    items: [
      {
        _id: uuid(),
        foodId: uuid(), // to see details the other information
        foodName: "Cam",
        unitPrice: 20000,
        unitType: "kg",
        quantity: 0.5,
      },
    ],
  },
];

export const PAYMENT_COURSES_DATA = [
  {
    _id: uuid(),
    customer: {
      _id: uuid(),
      name: "Phan Trong Duc",
      email: "trongduc@gmail.com",
      phoneNumber: "0987675646",
    },
    createdAt: Date.now(),
    address: "62/07 Đồng Kè - Hòa Khánh Bắc - Liên Chiểu - Đà Nẵng",
    orderStatus: {
      id: 1,
      description: "Chưa giao hàng",
    },
    paymentMethod: "Momo", // always Momo
    shipmentFee: 0, // Khong tinh phi
    merchandiseSubtotal: 20000, // tien san pham chua tinh ship
    total: 20000, // tong tien bao gom ship fee
    items: [
      {
        _id: uuid(),
        courseId: uuid(), // to see details the other information
        courseName: "Món Châu Á",
        unitPrice: 700000,
        unitType: "Khóa", // always Khóa
        quantity: 1, // always 1
      },
    ],
  },
  {
    _id: uuid(),
    customer: {
      _id: uuid(),
      name: "Phan Trong Duc",
    },
    createdAt: Date.now(),
    address: "62/07 Đồng Kè - Hòa Khánh Bắc - Liên Chiểu - Đà Nẵng",
    orderStatus: {
      id: 1,
      description: "Chưa giao hàng",
    },
    paymentMethod: "Momo", // always Momo
    shipmentFee: 0, // Khong tinh phi
    merchandiseSubtotal: 20000, // tien san pham chua tinh ship
    total: 20000, // tong tien bao gom ship fee
    items: [
      {
        _id: uuid(),
        courseId: uuid(), // to see details the other information
        courseName: "Món Châu Á",
        unitPrice: 700000,
        unitType: "Khóa", // always Khóa
        quantity: 1, // always 1
      },
    ],
  },
  {
    _id: uuid(),
    customer: {
      _id: uuid(),
      name: "Phan Trong Duc",
    },
    createdAt: Date.now(),
    address: "62/07 Đồng Kè - Hòa Khánh Bắc - Liên Chiểu - Đà Nẵng",
    orderStatus: {
      id: 1,
      description: "Chưa giao hàng",
    },
    paymentMethod: "Momo", // always Momo
    shipmentFee: 0, // Khong tinh phi
    merchandiseSubtotal: 20000, // tien san pham chua tinh ship
    total: 20000, // tong tien bao gom ship fee
    items: [
      {
        _id: uuid(),
        courseId: uuid(), // to see details the other information
        courseName: "Món Châu Á",
        unitPrice: 700000,
        unitType: "Khóa", // always Khóa
        quantity: 1, // always 1
      },
    ],
  },
];

export const VOUCHERS_DATA = [
  {
    _id: uuid(),
    name: "VUIVECUOITHANG",
    discountOff: 50, // percent (%)
    content: "Giảm 50% tổng bill tối đa 50k (đơn tối thiểu 250k)",
    remainingSlot: 10,
    maxDiscountOff: 50000,
    minOrder: 250000,
    expiredDate: Date.now(),
  },
  {
    _id: uuid(),
    name: "VUIVECUOITHANG",
    discountOff: 50, // percent (%)
    content: "Giảm 50% tổng bill tối đa 50k (đơn tối thiểu 250k)",
    remainingSlot: 10,
    maxDiscountOff: 50000,
    minOrder: 250000,
    expiredDate: Date.now(),
  },
  {
    _id: uuid(),
    name: "VUIVECUOITHANG",
    discountOff: 50, // percent (%)
    content: "Giảm 50% tổng bill tối đa 50k (đơn tối thiểu 250k)",
    remainingSlot: 10,
    maxDiscountOff: 50000,
    minOrder: 250000,
    expiredDate: Date.now(),
  },
  {
    _id: uuid(),
    name: "VUIVECUOITHANG",
    discountOff: 50, // percent (%)
    content: "Giảm 50% tổng bill tối đa 50k (đơn tối thiểu 250k)",
    remainingSlot: 10,
    maxDiscountOff: 50000,
    minOrder: 250000,
    expiredDate: Date.now(),
  },
  {
    _id: uuid(),
    name: "VUIVECUOITHANG",
    discountOff: 50, // percent (%)
    content: "Giảm 50% tổng bill tối đa 50k (đơn tối thiểu 250k)",
    remainingSlot: 10,
    maxDiscountOff: 50000,
    minOrder: 250000,
    expiredDate: Date.now(),
  },
];
