import React from 'react';

export default ({ label = 'emoji', em = '🥰' }) => (
  <span role="img" aria-label={label}>
    {em}
  </span>
);
