import courseAPI from "api/courseAPI";
import examinationAPI from "api/examinationAPI";
import testAPI from "api/testAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/course";

const createCourse = (data) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_COURSE });
    courseAPI
      .createCourse(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.CREATE_COURSE_SUCCEED,
            payload: result.data,
          });
          useNotification.Success({
            message: "Create course successfully!",
          });
        } else {
          dispatch({ type: types.CREATE_COURSE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Create course failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.CREATE_COURSE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const updateCourseById = (input) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_COURSE_BY_ID });
    courseAPI
      .updateCourseById(input)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_COURSE_BY_ID_SUCCEED,
            payload: result.course,
          });
          useNotification.Success({
            message: "Update course successfully!",
          });
        } else {
          dispatch({ type: types.UPDATE_COURSE_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Update course failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_COURSE_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const deleteCourseById = (courseIds) => {
  return (dispatch) => {
    dispatch({ type: types.REMOVE_COURSE_BY_ID });
    courseAPI
      .deleteCourseById(courseIds)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.REMOVE_COURSE_BY_ID_SUCCEED,
            payload: courseIds,
          });
          useNotification.Success({
            title: "Message",
            message: `Delete course(s)`,
          });
        } else {
          dispatch({ type: types.REMOVE_COURSE_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Delete course failed!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: types.REMOVE_COURSE_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getListCoursePerPage = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_COURSE_PER_PAGE });
    courseAPI
      .getListCoursePerPage(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_COURSE_PER_PAGE_SUCCEED,
            payload: {
              courses: result.courses,
              totalPage: result.totalPage,
              totalRows: result.totalRows,
            },
          });
        } else {
          dispatch({ type: types.GET_LIST_COURSE_PER_PAGE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get course(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_COURSE_PER_PAGE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getCourseById = (courseId) => {
  return (dispatch) => {
    dispatch({ type: types.GET_COURSE_BY_ID });
    courseAPI
      .getCourseById(courseId)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_COURSE_BY_ID_SUCCEED,
            payload: result.course,
          });
        } else {
          dispatch({ type: types.GET_COURSE_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get course failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_COURSE_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getExaminationByCourseId = (courseId) => {
  return (dispatch) => {
    dispatch({ type: types.GET_EXAMINATION_BY_COURSE_ID });
    examinationAPI
      .getExaminationByCourseId(courseId)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_EXAMINATION_BY_COURSE_ID_SUCCEED,
            payload: result.examination,
          });
        } else {
          dispatch({ type: types.GET_EXAMINATION_BY_COURSE_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get examination failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_EXAMINATION_BY_COURSE_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const createTest = (data) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_TEST });
    testAPI
      .createTest(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.CREATE_TEST_SUCCEED,
            payload: result.test,
          });
          useNotification.Success({
            message: "Submit test successfully!",
          });
        } else {
          dispatch({ type: types.CREATE_TEST_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Submit test failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.CREATE_TEST_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};
const updateTestById = (data) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_TEST });
    testAPI
      .updateTestById(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_COURSE_BY_ID_SUCCEED,
            payload: result.test,
          });
          useNotification.Success({
            message: "Update test successfully!",
          });
        } else {
          dispatch({ type: types.UPDATE_COURSE_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Update test failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_COURSE_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};
const getTestById = (courseId) => {
  return (dispatch) => {
    dispatch({ type: types.GET_TEST_ID });
    testAPI
      .getTestById(courseId)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_TEST_ID_SUCCEED,
            payload: result.test,
          });
          useNotification.Success({
            message: "Get test successfully!",
          });
        } else {
          dispatch({ type: types.GET_TEST_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get test failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_TEST_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};
const getListTestPerPage = (data) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_TEST_PER_PAGE });
    testAPI
      .getListTestPerPage(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_TEST_PER_PAGE_SUCCEED,
            payload: {
              tests: result.tests,
              totalPage: result.totalPage,
              totalRows: result.totalRows,
            },
          });
        } else {
          dispatch({ type: types.GET_LIST_TEST_PER_PAGE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get test(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_TEST_PER_PAGE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export {
  createCourse,
  updateCourseById,
  deleteCourseById,
  getListCoursePerPage,
  getCourseById,
  getExaminationByCourseId,
  createTest,
  updateTestById,
  getTestById,
  getListTestPerPage,
};
