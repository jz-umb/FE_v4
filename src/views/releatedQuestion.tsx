import { List, NoticeBar, Loading } from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import '@/styles/releatedQuestions.scss';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const mockApi = "https://www.fastmock.site/mock/3415e127e9d7f0a913d28b025474b5a4/answer/randomQuestions"

export default function ReleatedQuestions() {
    const location = useLocation(); //get the question title
    const { question } = location.state as any;
    console.log("🚀 ~ file: releatedQuestion.tsx ~ line 13 ~ ReleatedQuestions ~ questionSelected", question)
    const [questions, setRelatedQuestions] = useState([])
    const history = useHistory();

    useEffect(() => {
        // TODO give the input to back-end request interaction 
        axios.get(mockApi).then((res) => {
            const { data: questionsList } = res.data as any;
            setRelatedQuestions(questionsList)
        })
    }, [])
    function handleQuestionChoosen(e: string) {
        history.push({ pathname: "./answerDetail", state: { question: e } })
    }
    return (
        <>
            <NoticeBar content='Are these your concern?' color='info' />
            {
                <List className="releated-questions" mode='card'>
                    {
                        questions.map(({ msg, id }) => (
                            <List.Item key={id} onClick={() => handleQuestionChoosen(msg)}>{msg}</List.Item>
                        ))
                    }
                </List>
            }
            {
                !questions.length && <Loading />
            }
        </>
    )
}
