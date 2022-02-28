import createHttpError from "http-errors";
import { Order, OrderItem, User, Food, Course } from "../models";
import { dateFunction } from "../utils";

const { getMonthsByquater, getQuaterByMonth, getDateInWeek } = dateFunction;

const getRevenuesInfo = async (req, res, next) => {
  try {
    let getInfoBy = Number(req.params.getInfoBy);
    const today = new Date();
    var revenues = [];
    let startDate;
    let endDate;
    var year;
    var month;
    var orders;
    var quater;
    var labels = [];
    switch (getInfoBy) {
      case 0:
        const dateInWeek = getDateInWeek(today);
        startDate = dateInWeek[0];
        endDate = dateInWeek[1];
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        orders = await Order.find({
          createAt: {
            $gte: startDate,
            $lt: endDate,
          },
          statusId: 4,
        });
        orders = orders.map((x) => {
          return {
            day: new Date(x.createAt).getDay(),
            revenue: x.total,
          };
        });
        revenues = orders.reduce((init, cur) => {
          if (!init[cur.day]) init[cur.day] = cur.revenue;
          else init[cur.day] = init[cur.day] + cur.revenue;
          return init;
        }, {});
        labels = [
          "Chủ nhật",
          "Thứ 2",
          "Thứ 3",
          "Thứ 4",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
        ];

        break;
      case 1:
        month = today.getMonth();
        year = today.getFullYear();
        month = Number(month);
        year = Number(year);
        startDate = new Date(year, month - 1, 1);
        endDate = new Date(year, month, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        orders = await Order.find({
          createAt: {
            $gte: startDate,
            $lt: endDate,
          },
          statusId: 4,
        });
        orders = orders.map((x) => {
          return {
            date: new Date(x.createAt).getDate(),
            revenue: x.total,
          };
        });
        revenues = orders.reduce((init, cur) => {
          if (!init[cur.date]) init[cur.date] = cur.revenue;
          else init[cur.date] = init[cur.date] + cur.revenue;
          return init;
        }, {});
        const days = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        ).getDate();
        for (let i = 1; i <= days; i++) {
          labels.push(`Ngày ${i}`);
        }
        break;
      case 2:
        quater = getQuaterByMonth(today.getMonth() + 1);
        year = today.getFullYear();
        quater = Number(quater);
        year = Number(year);
        let months = getMonthsByquater(quater);
        startDate = new Date(year, months[0] - 1, 1);
        endDate = new Date(year, months[2] - 1, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        orders = await Order.find({
          createAt: {
            $gte: startDate,
            $lt: endDate,
          },
          statusId: 4,
        });
        orders = orders.map((x) => {
          return {
            month: new Date(x.updateAt).getMonth() + 1,
            revenue: x.total,
          };
        });
        revenues = orders.reduce((init, cur) => {
          if (!init[cur.month]) init[cur.month] = cur.revenue;
          else init[cur.month] = init[cur.month] + cur.revenue;
          return init;
        }, {});
        labels = months.map((item) => `Tháng ${item}`);
        break;
      case 3:
        year = today.getFullYear();
        year = Number(year);
        startDate = new Date(year, 0, 1);
        endDate = new Date(year, 11, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        orders = await Order.find({
          createAt: {
            $gte: startDate,
            $lt: endDate,
          },
          statusId: 4,
        });
        orders = orders.map((x) => {
          return {
            month: new Date(x.createAt).getMonth() + 1,
            revenue: x.total,
          };
        });
        revenues = orders.reduce((init, cur) => {
          if (!init[cur.month]) init[cur.month] = cur.revenue;
          else init[cur.month] = init[cur.month] + cur.revenue;
          return init;
        }, {});
        labels = [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ];
        break;
      default:
        throw createHttpError(400, "Not found getInfoBy");
    }
    const datasets = labels.map((_, index) => {
      return revenues[index.toString()] || 0;
    });
    res.status(200).json({
      status: 200,
      msg: "Get revenues successfully!",
      labels,
      datasets,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getGeneralInfo = async (req, res, next) => {
  try {
    let orders = await Order.find();
    const totalRevenues = orders
      .filter((item) => item.statusId == 4)
      .reduce((pre, cur) => pre + cur.total, 0);
    const totalCustomers = await User.find({ roleId: 1 }).count();
    const totalOrders = await Order.find({ orderType: 1, statusId: 4 }).count();
    let totalCourses = await Order.find({
      orderType: 2,
      statusId: 4,
    });
    totalCourses = totalCourses.reduce((pre, cur) => pre + cur.items.length, 0);
    let popularFoodIds = await OrderItem.aggregate([
      {
        $match: {
          orderType: 1,
        },
      },
      {
        $group: {
          _id: "$itemId",
          count: { $sum: 1 },
        },
      },

      {
        $sort: { count: -1 },
      },
    ]);

    if (popularFoodIds.length > 20)
      popularFoodIds = popularFoodIds.slice(0, 20);
    let popularFoods = await Promise.all(
      popularFoodIds.map((item) => Food.findById(item._id))
    );
    popularFoods = popularFoods.map((item, index) => {
      return {
        ...item._doc,
        amountOfBuy: popularFoodIds[index].count,
      };
    });

    let popularCourseIds = await OrderItem.aggregate([
      {
        $match: {
          orderType: 2,
        },
      },
      {
        $group: {
          _id: "$itemId",
          count: { $sum: 1 },
        },
      },

      {
        $sort: { count: -1 },
      },
    ]);

    if (popularCourseIds.length > 20)
      popularCourseIds = popularCourseIds.slice(0, 20);
    let popularCourses = await Promise.all(
      popularCourseIds.map((item) => Course.findById(item._id))
    );
    popularCourses = popularCourses.map((item, index) => {
      return {
        ...item._doc,
        amountOfBuy: popularFoodIds[index].count,
      };
    });

    let popularRecipe = [];

    res.status(200).json({
      status: 200,
      msg: "Get general statistic successfully!",
      totalOrders,
      totalCustomers,
      totalCourses,
      totalRevenues,
      popularCourses,
      popularFoods,
      popularRecipe,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const statisticController = { getRevenuesInfo, getGeneralInfo };
