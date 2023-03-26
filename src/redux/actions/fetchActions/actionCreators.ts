import { IActionUnion } from '../../../lib/interfaces/IActionUnion';
import { IPost } from '../../../models/IPost';
import { FetchPostActionType } from './types';

const makeAction =
  <TAction extends FetchPostActionType, TPayload extends any = void>(actionType: TAction) =>
  (payload: TPayload) => {
    return {
      type: actionType,
      payload
    };
  };

export const fetchPostActionCreators = {
  makeFetchRequestAction: makeAction(FetchPostActionType.FETCH_REQUEST),
  makeFetchSuccessAction: makeAction<FetchPostActionType.FETCH_SUCCESS, IPost>(FetchPostActionType.FETCH_SUCCESS),
  makeFetchErrorAction: makeAction<FetchPostActionType.FETCH_ERROR, string>(FetchPostActionType.FETCH_ERROR)
};

export type IFetchAction = IActionUnion<typeof fetchPostActionCreators>;
