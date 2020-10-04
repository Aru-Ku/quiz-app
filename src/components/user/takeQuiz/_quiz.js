import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { topicsColl, userColl } from '../../../utils/firebase';
import Question from './_question';

export default ({ state: { count, topic, uid }, show, loading }) => {
  const [questions, setQuestions] = useState([]);
  const history = useHistory();

  const fetchQuestions = useCallback(async () => {
    let set = new Set();
    let ques = [];
    await topicsColl
      .doc(topic)
      .get()
      .then(snap => {
        while (set.size < 5) {
          set.add(Math.floor(Math.random() * count));
          if (set.size === 5) break;
        }
        ques = [...snap.data().questions];
      });
    setQuestions(() => [...Array.from(set).map(n => ques[n])]);
    show();
  }, [count, topic, setQuestions, show]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const submitQuiz = async e => {
    let answers = [];

    Array.from(document.getElementById('takeQuiz').getElementsByTagName('li')).forEach((_el, index) => {
      const question = document.getElementsByName(questions[index].question);
      Array.from(question).forEach(q => {
        if (q.checked) {
          answers.push(q.value === questions[index].correct);
        }
      });
    });

    if (answers.length === questions.length) {
      e.preventDefault();
      let score = answers.reduce((total, check) => (check ? (total = total + 1) : total), 0);
      await userColl
        .doc(uid)
        .get()
        .then(async doc => {
          const docData = { ...doc.data() };
          if (docData[topic]) {
            // update
            await userColl.doc(uid).set({ ...docData, [topic]: [...docData[topic], score] });
          } else {
            // set -- new
            await userColl.doc(uid).set({ ...docData, [topic]: [score] });
          }
        });
      history.push('/');
      return;
    }
  };

  const resetForm = e => {
    e.preventDefault();
    Array.from(document.getElementById('takeQuiz').getElementsByTagName('li')).forEach((_el, index) => {
      const question = document.getElementsByName(questions[index].question);
      Array.from(question).forEach(q => {
        q.checked = false;
      });
    });
  };

  return (
    <div>
      {loading ? null : (
        <form id="takeQuiz">
          <ol style={{ width: '50%' }}>
            {questions.map(({ question, options }, index) => (
              <Question key={index} question={question} options={options} />
            ))}
          </ol>
          <Bottombar>
            <button className="reset" onClick={resetForm}>
              RESET
            </button>
            <button className="submit" onClick={submitQuiz}>
              Submit
            </button>
          </Bottombar>
        </form>
      )}
    </div>
  );
};

const Bottombar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 50px;
  > .reset {
    background: white;
    border: none;
    color: black;
    font-weight: 500;
    letter-spacing: 1px;
  }
  > .submit {
    border: none;
    background: black;
    color: white;
    padding: 5px 15px;
    margin-left: 10px;
    border-radius: 5px;
    &:hover {
      box-shadow: 0px 4px 10px 0 #000000d4;
    }
  }
`;
