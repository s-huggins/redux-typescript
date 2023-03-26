import { FC, useEffect, useReducer } from 'react';
import { IActionUnion } from '../lib/interfaces/IActionUnion';

interface IPost {
  title: string;
}

interface IState {
  loading: boolean;
  error: string | null;
  post: IPost | null;
}

enum ActionType {
  FETCH_REQUEST = 'FETCH_REQUEST',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR'
}

const makeAction =
  <TAction extends ActionType, TPayload extends any = void>(actionType: TAction) =>
  (payload: TPayload) => {
    return {
      type: actionType,
      payload
    };
  };

const fetchActionCreators = {
  makeRequestAction: makeAction(ActionType.FETCH_REQUEST),
  makeRequestSuccessAction: makeAction<ActionType.FETCH_SUCCESS, IPost>(ActionType.FETCH_SUCCESS),
  makeRequestErrorAction: makeAction<ActionType.FETCH_ERROR, string>(ActionType.FETCH_ERROR)
};

type IFetchAction = IActionUnion<typeof fetchActionCreators>;

const INITIAL_STATE: IState = {
  loading: false,
  error: null,
  post: null
};

const reducer = (state: IState, action: IFetchAction): IState => {
  let newState: IState;
  switch (action.type) {
    case ActionType.FETCH_REQUEST:
      newState = { ...state, loading: true, error: null };
      break;
    case ActionType.FETCH_SUCCESS:
      newState = { loading: false, error: null, post: action.payload };
      break;
    case ActionType.FETCH_ERROR:
      newState = { ...state, loading: false, error: action.payload };
      break;
    default:
      newState = { ...state };
      break;
  }
  return newState;
};

export const DataFetchingComponent: FC = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchPost = async () => {
    dispatch(fetchActionCreators.makeRequestAction());
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await res.json();
      dispatch(fetchActionCreators.makeRequestSuccessAction(data));
    } catch (error) {
      dispatch(fetchActionCreators.makeRequestErrorAction('Error fetching post'));
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  let content;
  if (state.loading) {
    content = 'Loading...';
  } else if (state.error) {
    content = state.error;
  } else if (state.post) {
    content = state.post.title;
  }

  return <p>{content}</p>;
};
