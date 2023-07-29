import axios from "axios";


const rootUrl = "https://071183af-a2e9-4d40-b889-ee5ae90d0ee5.mock.pstmn.io"

let baseURL = rootUrl + "/interview";

// Function to make the API call to start interview
export async function startInterview(courseName :string): Promise<any> {
    try {
        const response = await axios.get(`${baseURL}/${courseName}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to make the API call for submitting an answer
export async function submitAnswer(answer : any, count : number) {
    let answerBaseUrl = baseURL
    if (count >= 9) {
        answerBaseUrl += `/end`
        console.log("inside count baseurl", answerBaseUrl)
    }
    try {
        const response = await axios.post(`${answerBaseUrl}`, answer);
        return response;
    } catch (error) {
        console.error('Error submitting answer:', error);
        throw error;
    }
}