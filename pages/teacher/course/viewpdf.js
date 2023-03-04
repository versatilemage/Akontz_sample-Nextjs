import React, {useEffect, useRef} from 'react';

function Viewer({ fileUrl }) {
    return (
      <iframe src={fileUrl} width="100%" height="800vh" />
    );
  }
  
export default Viewer;
