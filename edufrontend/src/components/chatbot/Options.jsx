import React from "react"
import './Options.css';
const Options = (props) => {
const options = [
    {
        text: "Analysis of Algorithms",
        handler: props.actionProvider.handleDP, 
        id:1,
    },
    {text: "Foundation of Data Management", handler: props.actionProvider.handleEpsilon, id: 2},
    {text: "Information Retrieval", handler: props.actionProvider.handleNeighbouring, id: 3}
];

const buttonsMarkup = options.map((option) => (
    <button key = {option.id} onClick = {option.handler} className="option-button">
        {option.text}
    </button>

    
));

return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;