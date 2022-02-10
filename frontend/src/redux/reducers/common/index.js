import Cookies from "js-cookie";
import { getAccessToken, getRefreshAccessToken } from "utils/authUtils";
import * as types from "../../types/common";

const initialState = {
  token: getAccessToken(),
  refreshToken: getRefreshAccessToken(),
  loadingGetNewToken: false,
  userDetail: {
    information:
      (Cookies.get("profile") && JSON.parse(Cookies.get("profile"))) || {},
    loading: false,
    profile: {},
  },
  updateProfile: {
    loading: false,
  },
  updateAvatar: {
    loading: false,
  },
  changePassword: {
    loading: false,
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_TOKEN:
      return {
        ...state,
        token: actions.payload,
      };
    case types.SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: actions.payload,
      };

    case types.GET_TOKEN:
      return {
        ...state,
        loadingGetNewToken: true,
      };
    case types.GET_TOKEN_SUCCEED:
      return {
        ...state,
        loadingGetNewToken: false,
      };
    case types.GET_TOKEN_FAIL:
      return {
        ...state,
        loadingGetNewToken: false,
      };
    case types.SET_INFORMATION_USER:
      Cookies.set("profile", JSON.stringify(actions.payload));
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          information: actions.payload,
          loading: false,
        },
      };
    case types.GET_PROFILE:
      return {
        ...state,
        userDetail: { ...state.userDetail, loading: true },
      };
    case types.GET_PROFILE_SUCCEED:
      Cookies.set("profile", JSON.stringify(actions.payload));
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          profile: actions.payload,
          loading: false,
        },
      };
    case types.GET_PROFILE_FAIL:
      return {
        ...state,
        userDetail: { ...state.userDetail, loading: false },
      };

    case types.UPDATE_PROFILE:
      return {
        ...state,
        updateProfile: { loading: true },
      };
    case types.UPDATE_PROFILE_SUCCEED:
      const oldProfile = { ...state.userDetail.profile };
      const newData = actions.payload;
      const profile = { ...oldProfile, ...newData };
      Cookies.set("profile", JSON.stringify(profile));
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          profile: profile,
          information: profile,
          loading: false,
        },
        updateProfile: { loading: false },
      };
    case types.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        updateProfile: { loading: false },
      };

    case types.UPDATE_AVATAR:
      return {
        ...state,
        updateAvatar: { loading: true },
      };
    case types.UPDATE_AVATAR_SUCCEED: {
      const oldProfile = { ...state.userDetail.profile };
      const imageUrl = actions.payload;
      const profile = { ...oldProfile, imageUrl };
      Cookies.set("profile", JSON.stringify(profile));
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          profile: profile,
          information: profile,
          loading: false,
        },
        updateAvatar: { loading: false },
      };
    }
    case types.UPDATE_AVATAR_FAIL:
      return {
        ...state,
        updateAvatar: { loading: false },
      };

    case types.CHANGE_PASSWORD:
      return {
        ...state,
        changePassword: {
          loading: true,
        },
      };
    case types.CHANGE_PASSWORD_SUCCEED: {
      return {
        ...state,
        changePassword: {
          loading: false,
        },
      };
    }
    case types.CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        changePassword: {
          loading: false,
        },
      };
    default:
      return state;
  }
}
