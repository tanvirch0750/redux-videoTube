import Player from '../components/video-description/Player';
import VideoDescription from '../components/video-description/VideoDescription';
import RelatedVideoList from '../components/list/RelatedVideoList';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchVideo } from '../features/video/videoSlice';
import { useParams } from 'react-router-dom';
import Loading from '../components/ui/Loading';
import Error from '../components/ui/Error';

const Video = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { video, isLoading, isError, error } = useSelector(
    (state) => state.video
  );

  const { link, title, tags } = video || {};

  useEffect(() => {
    dispatch(fetchVideo(id));
  }, [dispatch, id]);

  // decide what to render
  let content = null;
  if (isLoading) content = <Loading />;
  if (!isLoading && isError) content = <Error message={error} />;
  if (!isLoading && !isError && !video?.id)
    content = <Error message="No video found" />;
  if (!isLoading && !isError && video?.id)
    content = (
      <div class="grid grid-cols-3 gap-2 lg:gap-8">
        <div class="col-span-full w-full space-y-8 lg:col-span-2">
          <Player link={link} title={title} />
          <VideoDescription video={video} />
        </div>

        <RelatedVideoList currentVideoId={id} tags={tags} />
      </div>
    );

  return (
    <section class="pt-6 pb-20">
      <div class="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">{content}</div>
    </section>
  );
};

export default Video;
