
console.log("##### Mermaid init loaded #####");

document.addEventListener("DOMContentLoaded", () => {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'base', 
    themeVariables: {
      primaryColor: '#E6F4EA', 
      primaryBorderColor: '#34A853', 
      primaryTextColor: '#202124', 

      lineColor: '#34A853', 
      
      secondaryColor: '#F1F3F4', 
      secondaryBorderColor: '#5F6368', 
      
      actorBkg: '#E6F4EA', 
      actorBorder: '#34A853', 
      actorTextColor: '#202124', 
    }
  });
});