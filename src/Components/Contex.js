import { createContext, useEffect, useState } from "react";
import { getQuestion } from "../question.service";
export const mycontext = createContext();

const initailState = {
    name: "",
    question: ""
};
export default function DataProvider({ children }) {
    const [questionRaise, setQuestionRaise] = useState(initailState);
    const [questionData, setQuestionData] = useState([]);
    const [searchName, setSearch] = useState("");

    useEffect(() => {
        getQuestion().then((res) => {
            setQuestionData(res.data.result);
        });
    }, []);

    return (
        <mycontext.Provider
            value={{
                questionRaise,
                setQuestionRaise,
                questionData,
                initailState,
                setQuestionData,
                searchName,
                setSearch
            }}
        >
            {children}
        </mycontext.Provider>
    );
}
