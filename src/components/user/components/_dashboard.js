import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Loader from '../../../ui_elements/loader';
import Emoji from '../../../ui_elements/emoji';
import { userColl } from '../../../utils/firebase';

export default ({ uid }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const fetchUserData = useCallback(async () => {
    await userColl
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.data()) setUserData({ ...doc.data() });
        setLoading(false);
      });
  }, [uid]);

  useEffect(() => {
    fetchUserData();
    return () => fetchUserData();
  }, [fetchUserData]);

  const show = () => {
    var coll = document.getElementsByClassName('collapsible');
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener('click', function () {
        this.classList.toggle('active');
        var content = this.nextElementSibling;
        if (content.style.display === 'block') {
          content.style.display = 'none';
        } else {
          content.style.display = 'block';
        }
      });
    }
  };

  return (
    <Dashboard tt={setUserData}>
      <h3>Dashboard</h3>
      {loading ? (
        <Loader size={30} />
      ) : Object.keys(userData).length === 0 ? (
        <p>
          No quizzes taken yet <Emoji em="😒" />
        </p>
      ) : (
        Object.keys(userData).map((key, index) => (
          <Topic key={key + index}>
            <div className="collapsible" onClick={show}>
              <span className="key">{key} »</span>
              {userData[key].map((value, index) => (
                <span key={value + index} className="content">
                  {`${value}/5${userData[key].length !== index + 1 ? `,` : `.`}`}
                </span>
              ))}
            </div>
          </Topic>
        ))
      )}
    </Dashboard>
  );
};

const Dashboard = styled.div`
  min-height: 150px;
  margin: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 10px 0 #000000d4;
  > h3 {
    margin: 0;
    font-weight: 600;
    text-decoration: underline;
    text-align: center;
  }
  > p {
    text-align: center;
  }
`;

const Topic = styled.div`
  margin: 5px 0;

  > .collapsible {
    width: 100%;
    background: white;
    color: black;
    text-align: left;
    > .key {
      font-weight: 500;
      margin-right: 5px;
    }
    > .content {
      margin-right: 5px;
    }
  }
`;
