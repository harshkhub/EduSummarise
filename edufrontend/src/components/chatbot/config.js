// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";
import Botmodified from './Botmodified.png';

const config = {
  botName: "EduSummarise",
  initialMessages: [createChatBotMessage(`Hello. Which course do you want to learn more about`, {
    widget: "options"
  })],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
      
    }
  ]
}

export default config