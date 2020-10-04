import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Loader from '../../../ui_elements/loader';
import Emoji from '../../../ui_elements/emoji';
import { topicsColl } from '../../../utils/firebase';

export default ({ uid }) => {
  const [loading, setLoading] = useState(true);
  const [topicNames, setTopicNames] = useState([]);

  const fetchTopicNames = useCallback(async () => {
    await topicsColl.get().then(snap => {
      const names = snap.docs.map(doc => ({
        name: doc.id,
        count: doc.data().questions.length,
      }));
      setTopicNames(names);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchTopicNames();
  }, [fetchTopicNames]);

  return (
    <NewTest>
      <h3>
        Take Quiz <Emoji em="📄" />
      </h3>
      {loading ? (
        <Loader />
      ) : (
        <div className="names">
          {topicNames.map(({ name, count }) => (
            <div key={name}>
              <Link
                to={{
                  pathname: `/topic/${name}`,
                  state: { count: count, topic: name, uid },
                }}>
                {name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </NewTest>
  );
};

const NewTest = styled.div`
  > h3 {
    text-align: center;
  }
  .names {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-gap: 10px;
    justify-content: space-evenly;
    > div {
      width: 100%;
      max-width: 200px;
      background: white;
      text-align: center;
      height: 30px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 0 #000000b8;
      > a {
        vertical-align: middle;
        color: black;
        font-weight: 500;
        &:not(:hover) {
          text-decoration: none;
        }
      }
    }
  }
`;
