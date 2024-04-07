class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message);
      const lowercase = message.toLowerCase()
      
      if(lowercase.includes("hello") ){
        this.actionProvider.greet();
      }
  
      else if(lowercase.includes("differential privacy") || lowercase.includes("dp")){
        this.actionProvider.handleDP();
      }
  
      else if(lowercase.includes("epsilon") || lowercase.includes("privacy budget")){
        this.actionProvider.handleEpsilon();
      }
      else if(lowercase.includes("neighbouring datasets") || lowercase.includes("neighbouring dataset")){
        this.actionProvider.handleNeighbouring();
      }
      else if(lowercase.includes("help")){
        this.actionProvider.handleHelp();
      }
      else{
        this.actionProvider.handleError();
      }
    }
  }
  
  export default MessageParser;