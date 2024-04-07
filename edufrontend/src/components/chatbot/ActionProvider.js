// ActionProvider starter code
class ActionProvider {
    constructor(
     createChatBotMessage,
     setStateFunc,
     createClientMessage,
     stateRef,
     createCustomMessage,
     ...rest
   ) {
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc;
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
   }
  
   greet = () => {
      const message = this.createChatBotMessage("Hello friend! ")
      this.addMessageToState(message);
   }
  
   handleDP = () => {
     const message = this.createChatBotMessage("This course covers various algorithms and their analysis techniques.")
     this.addMessageToState(message)
   }
  
   handleEpsilon = () =>{
     const message = this.createChatBotMessage("This course explores the principles and techniques behind information retrieval systems. Students will learn about indexing methods, search algorithms, and relevance ranking to retrieve relevant information from large collections of unstructured data, such as text documents, images, and multimedia.")
     this.addMessageToState(message)
   }
  
   handleNeighbouring = ()=>{
    const message = this.createChatBotMessage("Two datasets are neighbouring if they differ in at the most one row corresponding to one individual's data.")
    this.addMessageToState(message);
   }
  
   handleError = () =>{
    const message = this.createChatBotMessage("Sorry I didn't quite understand that. Try using help for a list of commands.")
    this.addMessageToState(message);
   }
   
   handleHelp = () =>{
    const message = this.createChatBotMessage("What do you want to learn?", {
      widget: "options"
    })
    this.addMessageToState(message);
   }
   addMessageToState = (message) =>{
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
   };
  }
  
  export default ActionProvider;