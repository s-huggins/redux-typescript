import { FetchPostActionType } from '../../actions';
import { IFetchAction } from '../../actions/fetchActions/actionCreators';

export interface IPost {
  title: string;
}

export interface IFetchPostState {
  loading: boolean;
  error: string | null;
  data: IPost | null;
}

const INITIAL_STATE: IFetchPostState = {
  loading: false,
  error: null,
  data: null
};

export const fetchPostReducer = (state: IFetchPostState = INITIAL_STATE, action: IFetchAction): IFetchPostState => {
  let newState: IFetchPostState;
  switch (action.type) {
    case FetchPostActionType.FETCH_REQUEST:
      newState = { ...state, loading: true, error: null };
      break;
    case FetchPostActionType.FETCH_SUCCESS:
      newState = { loading: false, error: null, data: action.payload };
      break;
    case FetchPostActionType.FETCH_ERROR:
      newState = { ...state, loading: false, error: action.payload };
      break;
    default:
      newState = { ...state };
      break;
  }
  return newState;
};
