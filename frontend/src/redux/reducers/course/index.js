import * as types from "../../types/course";

const initialState = {
  createCourseState: {
    loading: false,
  },
  updateCourseState: {
    loading: false,
  },
  removeTempCourseState: {
    loading: false,
  },
  getCourseByIdState: {
    loading: false,
    data: {},
  },
  courseList: [],
  loadingGetListCourse: false,
  totalPage: 0,
  totalRows: 0,

  courseListClient: [],
  isLimited: false,
  currentCount: 0,

  examinationByCourseId: {
    loading: false,
    data: {},
  },
  createTestState: {
    loading: false,
  },
  updateTestState: {
    loading: false,
  },
  getTestByIdState: {
    loading: false,
    test: {},
  },
  getListTestState: {
    testList: [],
    totalRows: 0,
    loading: false,
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.CREATE_COURSE:
      return {
        ...state,
        createCourseState: {
          loading: true,
        },
      };
    case types.CREATE_COURSE_SUCCEED:
      const coursesCreated = actions.payload;
      let temp = [...state.courseList];
      temp.push(coursesCreated);
      return {
        ...state,
        createCourseState: {
          loading: false,
        },
        courseList: temp,
        totalRows: state.totalRows + 1,
      };

    case types.CREATE_COURSE_FAIL:
      return {
        ...state,
        createCourseState: {
          loading: false,
        },
      };
    // UPDATE food
    case types.UPDATE_COURSE_BY_ID:
      return {
        ...state,
        updateCourseState: {
          loading: true,
        },
      };
    case types.UPDATE_COURSE_BY_ID_SUCCEED: {
      let newCourse = actions.payload;
      let temp = [...state.courseList];
      const index = temp.findIndex((item) => item._id === newCourse._id);
      temp[index] = newCourse;

      return {
        ...state,
        courseList: temp,
        updateCourseState: {
          loading: false,
        },
      };
    }

    case types.UPDATE_COURSE_BY_ID_FAIL:
      return {
        ...state,
        updateCourseState: {
          loading: false,
        },
      };
    // Remove temp food
    case types.REMOVE_COURSE_BY_ID:
      return {
        ...state,
        removeTempCourseState: {
          loading: true,
        },
      };
    case types.REMOVE_COURSE_BY_ID_SUCCEED: {
      let temp = [...state.courseList];
      const courseIds = actions.payload;

      return {
        ...state,
        courseList: temp.filter((item) => !courseIds.includes(item._id)),
        removeTempCourseState: {
          loading: false,
        },
      };
    }

    case types.REMOVE_COURSE_BY_ID_FAIL:
      return {
        ...state,
        removeTempCourseState: {
          loading: false,
        },
      };
    // get list food per page
    case types.GET_LIST_COURSE_PER_PAGE:
      return {
        ...state,
        loadingGetListCourse: true,
      };
    case types.GET_LIST_COURSE_PER_PAGE_SUCCEED: {
      let temp = state.currentCount + actions.payload.courses.length;

      return {
        ...state,
        loadingGetListCourse: false,
        courseList: actions.payload.courses,
        totalPage: actions.payload.totalPage,
        totalRows: actions.payload.totalRows,

        courseListClient: [
          ...state.courseListClient,
          ...actions.payload.courses,
        ],
        isLimited: temp === actions.payload.totalRows,
        currentCount: temp,
      };
    }

    case types.RESET_TO_SEARCH_COURSE:
      return {
        ...state,
        courseListClient: [],
        currentCount: 0,
      };

    case types.GET_LIST_COURSE_PER_PAGE_FAIL:
      return {
        ...state,
        loadingGetListCourse: false,
      };
    // get food by Id
    case types.GET_COURSE_BY_ID:
      return {
        ...state,
        getCourseByIdState: {
          loading: true,
        },
      };
    case types.GET_COURSE_BY_ID_SUCCEED:
      return {
        ...state,
        getCourseByIdState: {
          loading: false,
          data: actions.payload,
        },
      };

    case types.GET_COURSE_BY_ID_FAIL:
      return {
        ...state,
        getCourseByIdState: {
          loading: false,
        },
      };
    // get examination by courseId
    case types.GET_EXAMINATION_BY_COURSE_ID:
      return {
        ...state,
        examinationByCourseId: {
          loading: true,
        },
      };
    case types.GET_EXAMINATION_BY_COURSE_ID_SUCCEED:
      return {
        ...state,
        examinationByCourseId: {
          loading: false,
          data: actions.payload,
        },
      };

    case types.GET_EXAMINATION_BY_COURSE_ID_FAIL:
      return {
        ...state,
        examinationByCourseId: {
          loading: false,
        },
      };
    // CREATE TEST
    case types.CREATE_TEST:
      return {
        ...state,
        createTestState: {
          loading: true,
        },
      };
    case types.CREATE_TEST_SUCCEED:
      return {
        ...state,
        createTestState: {
          loading: false,
        },
      };

    case types.CREATE_TEST_FAIL:
      return {
        ...state,
        createTestState: {
          loading: false,
        },
      };
    //UPDATE TEST
    case types.UPDATE_TEST:
      return {
        ...state,
        updateTestState: {
          loading: true,
        },
      };
    case types.UPDATE_TEST_SUCCEED: {
      const testsTemp = actions.payload;
      let testListTemp = { ...state.getListTestState.testList };
      const index = testListTemp.findIndex(
        (item) => item._id === testsTemp._id
      );
      testListTemp[index] = testsTemp;
      return {
        ...state,
        updateTestState: {
          loading: false,
        },
        getListTestState: {
          testList: testListTemp,
        },
      };
    }
    case types.UPDATE_TEST_FAIL:
      return {
        ...state,
        updateTestState: {
          loading: false,
        },
      };

    // get test by id
    case types.GET_TEST_ID:
      return {
        ...state,
        getTestByIdState: {
          loading: true,
        },
      };
    case types.GET_TEST_ID_SUCCEED: {
      return {
        ...state,
        getTestByIdState: {
          loading: false,
          test: actions.payload,
        },
      };
    }
    case types.GET_TEST_ID_FAIL:
      return {
        ...state,
        getTestByIdState: {
          loading: false,
        },
      };

    case types.GET_LIST_TEST_PER_PAGE:
      return {
        ...state,
        getListTestState: {
          loading: true,
        },
      };
    case types.GET_LIST_TEST_PER_PAGE_SUCCEED: {
      return {
        ...state,
        getListTestState: {
          loading: false,
          testList: actions.payload.tests,
          totalRows: actions.payload.totalRows,
        },
      };
    }
    case types.GET_LIST_TEST_PER_PAGE_FAIL:
      return {
        ...state,
        getListTestState: {
          loading: false,
        },
      };
    default:
      return state;
  }
}
