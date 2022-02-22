import * as types from "../../types/certification";

const initialState = {
  createCertificationState: {
    loading: false,
  },
  updateCertificationState: {
    loading: false,
  },
  removeTempCertificationState: {
    loading: false,
  },
  getCertificationByIdState: {
    loading: false,
    data: {},
  },
  certificationList: [],
  loadingGetListCertification: false,
  totalPage: 0,
  totalRows: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.CREATE_CERTIFICATION:
      return {
        ...state,
        createCertificationState: {
          loading: true,
        },
      };
    case types.CREATE_CERTIFICATION_SUCCEED:
      const certificationsCreated = actions.payload;
      let temp = [...state.certificationList];
      temp.push(certificationsCreated);
      return {
        ...state,
        createCertificationState: {
          loading: false,
        },
        certificationList: temp,
        totalRows: state.totalRows + 1,
      };

    case types.CREATE_CERTIFICATION_FAIL:
      return {
        ...state,
        createCertificationState: {
          loading: false,
        },
      };
    // UPDATE food
    case types.UPDATE_CERTIFICATION_BY_ID:
      return {
        ...state,
        updateCertificationState: {
          loading: true,
        },
      };
    case types.UPDATE_CERTIFICATION_BY_ID_SUCCEED: {
      let newCertification = actions.payload;
      let temp = [...state.certificationList];
      const index = temp.findIndex((item) => item._id === newCertification._id);
      temp[index] = newCertification;

      return {
        ...state,
        certificationList: temp,
        updateCertificationState: {
          loading: false,
        },
      };
    }

    case types.UPDATE_CERTIFICATION_BY_ID_FAIL:
      return {
        ...state,
        updateCertificationState: {
          loading: false,
        },
      };
    // Remove temp food
    case types.REMOVE_CERTIFICATION_BY_ID:
      return {
        ...state,
        removeTempCertificationState: {
          loading: true,
        },
      };
    case types.REMOVE_CERTIFICATION_BY_ID_SUCCEED: {
      let temp = [...state.certificationList];
      const certificationIds = actions.payload;

      return {
        ...state,
        certificationList: temp.filter(
          (item) => !certificationIds.includes(item._id)
        ),
        removeTempCertificationState: {
          loading: false,
        },
      };
    }

    case types.REMOVE_CERTIFICATION_BY_ID_FAIL:
      return {
        ...state,
        removeTempCertificationState: {
          loading: false,
        },
      };
    // get list food per page
    case types.GET_LIST_CERTIFICATION_PER_PAGE:
      return {
        ...state,
        loadingGetListCertification: true,
      };
    case types.GET_LIST_CERTIFICATION_PER_PAGE_SUCCEED:
      return {
        ...state,
        loadingGetListCertification: false,
        certificationList: actions.payload.certifications,
        totalPage: actions.payload.totalPage,
        totalRows: actions.payload.totalRows,
      };

    case types.GET_LIST_CERTIFICATION_PER_PAGE_FAIL:
      return {
        ...state,
        loadingGetListCertification: false,
      };
    // get food by Id
    case types.GET_CERTIFICATION_BY_ID:
      return {
        ...state,
        getCertificationByIdState: {
          loading: true,
        },
      };
    case types.GET_CERTIFICATION_BY_ID_SUCCEED:
      return {
        ...state,
        getCertificationByIdState: {
          loading: false,
          data: actions.payload,
        },
      };

    case types.GET_CERTIFICATION_BY_ID_FAIL:
      return {
        ...state,
        getCertificationByIdState: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
