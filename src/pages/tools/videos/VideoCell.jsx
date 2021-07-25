import React from 'react';
import { Modal } from '@/components';

const VideoCell = ({ text, thumbnail, videoUrl }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', }}>
      <img className="mr-3 object-fit-cover" alt="thumbnail" style={{marginRight: 10}} src={thumbnail} height="40" width={40} />
      <Modal triggerLabel={text} modalTitle={text}>
        <video controls style={{width: '100%'}}>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </Modal>
    </div>
  );
};

export default VideoCell;
