/*
 * @Date: 2021-10-16 17:37:44
 */
import { Input, Button, Space, List, Loading, Toast } from 'antd-mobile';
import React, { useState, useEffect } from 'react';
import '@/styles/searcher.scss';
import { SearchOutline } from 'antd-mobile-icons'
import axios from 'axios';
import { useHistory } from "react-router-dom";
const mockApi = "https://www.fastmock.site/mock/3415e127e9d7f0a913d28b025474b5a4/answer/randomQuestions"
import DB from "@/utils/firebase";
import { collection, query, limit, getDocs, startAt, orderBy } from "firebase/firestore";
const corpusRef = collection(DB, "Corpus");
// const q = query(corpusRef, orderBy("answerText"), limit(3), startAt(1000));
// const querySnapshot = await getDocs(q);
// console.log("🚀 ~ file: searcher.tsx ~ line 16 ~ querySnapshot", querySnapshot)

export default function Searcher() {
    const [value, setValue] = useState('')
    const [randomQuestions, setRandomQuestions] = useState([])
    const history = useHistory();
    const handleSearch = () => {
        if (!value) {
            Toast.show({
                icon: 'fail',
                content: 'input your question',
            })
            return;
        }
        history.push({ pathname: "./relatedQuestions", state: { question: value } })
    }
    function handleQuestionChoosen(obj: any) {
        history.push({ pathname: "./answerDetail", state: { question: obj } })
    }
    useEffect(() => {
        // axios.get(mockApi).then((res) => {
        //     const { data: questionsList } = res.data as any;
        //     setRandomQuestions(questionsList)
        // }) // FIXME mock data
        const randomNum = ~~(Math.random() * 200) // randomly pick 5 from 200 data
        const q = query(corpusRef, orderBy("answerText"), limit(5), startAt(randomNum));
        getDocs(q).then(({ docs }) => {
            const questionsList = docs.map(doc => ({
                questionTitle: doc.data()["questionTitle"],
                answerText: doc.data()["answerText"],
                averageRate: doc.data()["averageRate"],
            }))
            setRandomQuestions(questionsList as any);
        })
    }, [])
    return (
        <>
            <div className="searcher">
                <Space align="center" justify="center" className="search-button">
                    <Input placeholder='how can i help you?' clearable value={value} onChange={val => {
                        setValue(val)
                    }} />
                    <Button onClick={() => handleSearch()}>
                        <Space>
                            <SearchOutline />
                        </Space>
                    </Button>
                </Space>
                {
                    <List className="random-questions" mode='card'>
                        {
                            randomQuestions.map(({ questionTitle, answerText, averageRate }) => (
                                <List.Item key={questionTitle} onClick={() => handleQuestionChoosen({ questionTitle, answerText, averageRate })}>{questionTitle}</List.Item>
                            ))
                        }
                        {
                            !randomQuestions.length && <Loading />
                        }
                    </List>
                }

            </div>
        </>
    )
}
