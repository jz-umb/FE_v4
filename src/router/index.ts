/*
 * @Date: 2021-10-16 17:37:44
 */
import Search from "@/views/searcher";
import ReleatedQuestions from "@/views/releatedQuestion";
import AnswerDetail  from "@/views/answerDetail";
import Thanks from "@/views/thanks";
const routes = [
    {
        path: "/",
        exact: true,
        component: Search
    },
    {
        path: "/search",
        exact: true,
        component: Search
    },
    {
        path: "/relatedQuestions",
        exact: true,
        component: ReleatedQuestions
    },
    {
        path: "/answerDetail",
        exact: true,
        component: AnswerDetail
    },
    {
        path: "/thanks",
        exact: true,
        component: Thanks
    }
]

export default routes;
