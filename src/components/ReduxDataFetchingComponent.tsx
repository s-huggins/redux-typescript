import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostActionCreators } from '../redux/actions/fetchActions/actionCreators';
import { IRootState } from '../redux/store';

export const ReduxDataFetchingComponent: FC = () => {
  const fetchPostState = useSelector((state: IRootState) => state.post);
  const dispatch = useDispatch();

  const fetchPost = async () => {
    dispatch(fetchPostActionCreators.makeFetchRequestAction());
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const data = await res.json();
      dispatch(fetchPostActionCreators.makeFetchSuccessAction(data));
    } catch (error) {
      dispatch(fetchPostActionCreators.makeFetchErrorAction('Error fetching post'));
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  let content;
  if (fetchPostState.loading) {
    content = 'Loading...';
  } else if (fetchPostState.error) {
    content = fetchPostState.error;
  } else if (fetchPostState.data) {
    content = fetchPostState.data.title;
  }

  return <p>{content}</p>;
};
