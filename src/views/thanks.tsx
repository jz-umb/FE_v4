/*
 * @Date: 2021-10-16 19:17:04
 */
import { Result, Tag } from 'antd-mobile';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '@/styles/answerDetail.scss';
import { SmileOutline } from 'antd-mobile-icons'
export default function Thanks() {
    const location = useLocation(); //get the data from previous page
    const { averageRate: averageRatePre } = location.state as any;
    const [averageRate] = useState(averageRatePre)
    return (
        <div className="thanks-container">
            <Result
                icon={<SmileOutline />}
                status='success'
                title='Success!'
                description='Average rating score for the recommendation：'
            />
            <Tag color='#87d068'>{averageRate}</Tag>
        </div>
    )
}
