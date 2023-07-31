import axios from "axios";

const rootUrl = "http://localhost:8080";

let baseURL = rootUrl + "/interview";

// Function to make the API call to start interview
export async function startInterview(courseName: string): Promise<any> {
  try {
    const response = await axios.get(`${baseURL}/${courseName}`);
    console.log(response.data.message);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Function to make the API call for submitting an answer
export async function submitAnswer(answer: any, count: number) {
  let answerBaseUrl = baseURL;
  if (count >= 9) {
    answerBaseUrl += `/end`;
    console.log("inside count baseurl", answerBaseUrl);
  }
  try {
    const response = await axios.post(`${answerBaseUrl}`, answer);
    // console.log(response);
    return response;
  } catch (error) {
    console.error("Error submitting answer:", error);
    throw error;
  }
}
