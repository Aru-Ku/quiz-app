import React, { Fragment } from 'react';

import Emoji from '../../../ui_elements/emoji';
import Loader from '../../../ui_elements/loader';

export default ({ loading = false }) => (
  <Fragment>
    {loading ? (
      <>
        <Loader />
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          Loading questions, Please wait <Emoji em="😋" />
        </div>
      </>
    ) : null}
  </Fragment>
);
