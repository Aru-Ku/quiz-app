import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiAddToQueue } from 'react-icons/bi';
import { GoLinkExternal } from 'react-icons/go';

import Loader from '../../ui_elements/loader';
import { topicsColl } from '../../utils/firebase';

export default ({ clsName, selectId }) => {
  const [docIds, setDocIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopics = useCallback(async () => {
    const snap = await topicsColl.get();
    const data = snap.docs.map(doc => doc.id);
    setDocIds(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTopics();
    return () => fetchTopics();
  }, [fetchTopics]);

  const taketopicName = async () => {
    const topicName = (prompt('Enter topic name:') || '').toUpperCase();
    if (topicName) {
      await topicsColl.doc(topicName).set({ questions: [] });
      fetchTopics();
    }
  };

  return (
    <div className={clsName}>
      <h3>Topics</h3>
      {docIds.map(id => (
        <TopicName key={id} onClick={() => selectId(id)}>
          {id} <GoLinkExternal />
        </TopicName>
      ))}
      {loading ? <Loader size={30} /> : null}
      <NewTopic onClick={taketopicName}>
        Add Topic <BiAddToQueue />
      </NewTopic>
    </div>
  );
};

const NewTopic = styled.button`
  width: 70%;
  margin-left: 15%;
  margin-top: 15px;
  height: 30px;
  background: transparent;
  border: 1px dashed black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: white;
  }
  > svg {
    width: 18px;
    height: 18px;
    margin: 0;
    padding-left: 5px;
  }
`;

const TopicName = styled(NewTopic)`
  margin: 10px 5%;
  width: 90%;
  background: white;
  font-size: 1.02rem;
  font-weight: 600px;
  border: none;
  box-shadow: 0px 2px 5px black;
  justify-content: space-between;
  > svg {
    transition: all 0.25s ease;
  }
  &:hover {
    > svg {
      width: 10px;
      height: 10px;
    }
  }
`;
