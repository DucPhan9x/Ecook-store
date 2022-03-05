import certificationAPI from "api/certificationAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/certification";

const createCertification = (data) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_CERTIFICATION });
    certificationAPI
      .createCertification(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.CREATE_CERTIFICATION_SUCCEED,
            payload: result.certification,
          });
          useNotification.Success({
            message: "Create certification successfully!",
          });
        } else {
          dispatch({ type: types.CREATE_CERTIFICATION_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Create certification failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.CREATE_CERTIFICATION_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const updateCertificationById = (input) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_CERTIFICATION_BY_ID });
    certificationAPI
      .updateCertificationById(input)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_CERTIFICATION_BY_ID_SUCCEED,
            payload: result.certification,
          });
          useNotification.Success({
            message: "Update certification successfully!",
          });
        } else {
          dispatch({ type: types.UPDATE_CERTIFICATION_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Update certification failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_CERTIFICATION_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const deleteCertificationById = (certificationIds) => {
  return (dispatch) => {
    dispatch({ type: types.REMOVE_CERTIFICATION_BY_ID });
    certificationAPI
      .deleteCertificationById(certificationIds)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.REMOVE_CERTIFICATION_BY_ID_SUCCEED,
            payload: certificationIds,
          });
          useNotification.Success({
            title: "Message",
            message: `Delete certification(s)`,
          });
        } else {
          dispatch({ type: types.REMOVE_CERTIFICATION_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Delete certification failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.REMOVE_CERTIFICATION_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getListCertificationPerPage = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_CERTIFICATION_PER_PAGE });
    certificationAPI
      .getListCertificationPerPage(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_CERTIFICATION_PER_PAGE_SUCCEED,
            payload: {
              certifications: result.certifications,
              totalPage: result.totalPage,
              totalRows: result.totalRows,
            },
          });
        } else {
          dispatch({ type: types.GET_LIST_CERTIFICATION_PER_PAGE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get certification(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_CERTIFICATION_PER_PAGE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getCertificationById = (certificationId) => {
  return (dispatch) => {
    dispatch({ type: types.GET_CERTIFICATION_BY_ID });
    certificationAPI
      .getCertificationById(certificationId)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_CERTIFICATION_BY_ID_SUCCEED,
            payload: result.certification,
          });
        } else {
          dispatch({ type: types.GET_CERTIFICATION_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get certification failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_CERTIFICATION_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getCertificationByClientIdAndCourseId = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_CERTIFICATION_BY_ID });
    certificationAPI
      .getCertificationByClientIdAndCourseId(data)
      .then((response) => response.json())
      .then((result) => {
        res(result);

        if (result.status === 200) {
          dispatch({
            type: types.GET_CERTIFICATION_BY_ID_SUCCEED,
            payload: result.certification,
          });
          res(result);
        } else {
          dispatch({ type: types.GET_CERTIFICATION_BY_ID_FAIL });
          useNotification.Error({
            title: "Thông báo",
            message: result.msg || "Get certification failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_CERTIFICATION_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export {
  createCertification,
  updateCertificationById,
  getListCertificationPerPage,
  getCertificationById,
  deleteCertificationById,
  getCertificationByClientIdAndCourseId,
};
