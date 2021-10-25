/*
 * @Date: 2021-10-16 19:17:04
 */
import { Rate, Card, Input, Button, Mask, Toast } from 'antd-mobile';
import React, { useEffect, useState } from 'react';
import '@/styles/answerDetail.scss';
import { MessageOutline } from 'antd-mobile-icons'
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import DB from "@/utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithPopup, } from "firebase/auth";
const auth = getAuth();
const provider = new GoogleAuthProvider();

// const dbRef = ref(getDatabase(App));
// Configure FirebaseUI.
function writeUserData(email: string, score: number, questionResponse: number) {
    return addDoc(collection(DB, "user_review_record"), {
        email,
        rate: score,
        questionResponse
      });
}

export default function AnswerDetail() {
    const [visible, setVisible] = useState(false)
    const [score, setScore] = useState(0)
    const history = useHistory();
    const location = useLocation(); //get the data from previous page
    const { question: questionSelected } = location.state as any;
    const [question] = useState(questionSelected.questionTitle)
    const [questionResponse] = useState(questionSelected.answerText)

    useEffect(() => {
        if (visible) {
            signInWithPopup(auth, provider).then((result) => {
                const user = result.user;
                console.log("🚀 ~ file: answerDetail.tsx ~ line 22 ~ .then ~ user", user)
                handleSubmit(user.email as string)
            }).catch((error) => {
                console.error(error)
            });
        }
    }, [visible])

    function handleRateChoosen(score: number) {
        setVisible(true)
        setScore(score)
    }

    function handleSubmit(email: string) {
        if (!email) {
            Toast.show({
                icon: 'fail',
                content: 'input your email',
            })
            return;
        }
        writeUserData(email, score, questionResponse).then(() => {
            history.push({ pathname: "./thanks", state: { averageRate: questionSelected.averageRate } })
        })
    }
    return (
        <div className="answer-detail-container">
            <Card
                title={
                    <div style={{ fontWeight: 'normal' }}>
                        <MessageOutline style={{ marginRight: '4px', color: '#1677ff' }} />
                        question title
                    </div>
                }
                style={{ borderRadius: '16px' }}
            >
                <div className="question">{question}</div>
                <div className="return-releted-questions" onClick={e => e.stopPropagation()}>
                    <Button
                        color='primary'
                        onClick={() => history.goBack()}
                    >
                        return
                    </Button>
                </div>
            </Card>
            <div className="answer-detail" dangerouslySetInnerHTML={{__html: questionResponse}} />
            <Rate className="rate" onChange={val => handleRateChoosen(val)} />
            {/* <Mask visible={visible} onMaskClick={() => setVisible(false)}>
                <div className="user-info">
                    <Input placeholder='Your email' type="email" clearable value={email} onChange={val => {
                        setEmail(val)
                    }} />
                    <CheckOutline onClick={handleSubmit} style={{ marginRight: '4px', color: '#1677ff', fontSize: '1.5rem' }} />
                </div>
            </Mask> */}
        </div>
    )
}
