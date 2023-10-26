// fastApiService.js
const sendRequestToFastAPI = async (inputText, setChatbotResponse) => {
    const url = "http://localhost:8000/api/chatbot"; // FastAPI endpoint URL
  
    const requestData = {
      text: inputText,
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const data = await response.json();
        setChatbotResponse(data.response);
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      setChatbotResponse("An error occurred while sending the request.");
    }
  };
  
  export default sendRequestToFastAPI;
  