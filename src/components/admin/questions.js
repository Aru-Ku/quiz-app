import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { GrAddCircle } from 'react-icons/gr';
import { topicsColl } from '../../utils/firebase';
import { toast } from 'react-toastify';
import Input from '../../ui_elements/input';
import Loader from '../../ui_elements/loader';

export default ({ clsName, topicId }) => {
  const [questions, setQuestions] = useState([]);
  const [modal, showModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const ques = {
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct: '',
  };
  const [newQuestion, setNewQuestion] = useState(ques);

  const modelStyles = {
    content: {
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
      height: '60%',
      padding: '0',
    },
  };

  const fetchTopicData = useCallback(async () => {
    setLoading(true);
    if (topicId && topicId !== '')
      await topicsColl
        .doc(topicId)
        .get()
        .then(doc => setQuestions(doc.data().questions));
    setLoading(false);
  }, [topicId, setQuestions, setLoading]);

  const updateInput = ({ target: { name, value } }) => {
    setNewQuestion(prev => {
      prev[name] = value;
      return { ...prev };
    });
  };

  const addQuestion = async e => {
    let { question, option_a, option_b, option_c, option_d, correct } = newQuestion;
    correct = correct.toUpperCase();
    if (question !== '' && option_a !== '' && option_b !== '' && option_c !== '' && option_d !== '') {
      e.preventDefault();
      if (['A', 'B', 'C', 'D'].includes(correct)) {
        const curr = [
          ...questions,
          {
            question,
            options: {
              A: option_a,
              B: option_b,
              C: option_c,
              D: option_d,
            },
            correct,
          },
        ];
        await topicsColl
          .doc(topicId)
          .update({ questions: curr })
          .then(() => {
            fetchTopicData();
            showModal(false);
            setNewQuestion(ques);
            toast.info('Question Added');
          });
      } else {
        alert('Correct option must be either A, B, C, D, a, b, c, d');
      }
    }
  };

  useEffect(() => {
    fetchTopicData();
    return () => fetchTopicData();
  }, [fetchTopicData]);

  const model = (
    <Modal
      style={modelStyles}
      isOpen={modal}
      ariaHideApp={false}
      onRequestClose={() => {
        showModal(false);
        setNewQuestion(ques);
      }}>
      <h3 style={{ textAlign: 'center', marginTop: 0 }}>Add new question</h3>
      <form>
        <Input name="question" label="Question" value={newQuestion.question} update={updateInput} />
        <Input name="option_a" label="Option A" value={newQuestion.option_a} update={updateInput} />
        <Input name="option_b" label="Option B" value={newQuestion.option_b} update={updateInput} />
        <Input name="option_c" label="Option c" value={newQuestion.option_c} update={updateInput} />
        <Input name="option_d" label="Option D" value={newQuestion.option_d} update={updateInput} />
        <Input name="correct" label="Correct Option" value={newQuestion.correct} update={updateInput} />
        <Submit onClick={addQuestion}>Submit</Submit>
      </form>
    </Modal>
  );

  const displayQuestions = questions.map(({ options, question, correct }, index) => (
    <Question key={index} num={correct.charCodeAt(0) - 64}>
      <p>{question}</p>
      <div className="options">
        <span>Options: </span>
        <span>{options.A}, </span>
        <span>{options.B}, </span>
        <span>{options.C}, </span>
        <span>{options.D}.</span>
      </div>
    </Question>
  ));

  return (
    <div className={clsName}>
      <h3>Questions</h3>
      {loading ? <Loader size={30} /> : null}
      {topicId === '' ? (
        <Info>Select topic to view & add new questions.</Info>
      ) : (
        <AddButton onClick={() => showModal(true)}>
          <GrAddCircle />
        </AddButton>
      )}
      {topicId !== '' && questions.length === 0 ? <Info>No questions yet in {topicId} topic.</Info> : null}
      {model}
      {displayQuestions}
    </div>
  );
};

const AddButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  > svg {
    width: 25px;
    height: 25px;
  }
`;

const Info = styled.div`
  width: 100%;
  margin-top: 15px;
  text-align: center;
`;

const Question = styled.div`
  padding: 3px;
  width: 95%;
  margin: 7px auto;
  border-radius: 10px;
  box-shadow: 0px 0px 7px 0 black;
  > p {
    margin: 0;
    font-weight: bold;
  }
  .options span {
    margin-right: 5px;
    font-size: 0.9rem;
    ${props => `&:nth-child(${props.num + 1}) { color: red; font-weight: 600;}`}
  }
`;

const Submit = styled.button`
  width: 50%;
  margin: 10px 25%;
  color: white;
  background-color: black;
  border: none;
  padding: 5px;
`;
