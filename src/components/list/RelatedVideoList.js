import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedVideos } from '../../features/relatedVideos/relatedVideosSlice';
import Error from '../ui/Error';
import RelatedVideoListItem from './RelatedVideoListItem';

const RelatedVideoList = ({ currentVideoId, tags }) => {
  const dispatch = useDispatch();
  const { relatedVideos, isLoading, isError, error } = useSelector(
    (state) => state.relatedVideos
  );

  useEffect(() => {
    dispatch(fetchRelatedVideos({ tags, id: currentVideoId }));
  }, [dispatch, tags, currentVideoId]);

  // decide what to render
  let content = null;
  if (!isLoading || isError) content = <Error message={error} />;
  if (!isLoading && !isError && relatedVideos.length === 0)
    content = <Error message="No related videos found" />;
  if (!isLoading && !isError && relatedVideos.length > 0)
    content = relatedVideos.map((video) => (
      <RelatedVideoListItem video={video} />
    ));

  return (
    <div class="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
};

export default RelatedVideoList;
