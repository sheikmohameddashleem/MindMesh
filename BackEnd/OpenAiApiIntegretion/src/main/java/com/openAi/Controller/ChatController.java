package com.openAi.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.openAi.DTO.Body;
import com.openAi.DTO.ChatRequest;
import com.openAi.DTO.ChatResponse;
import com.openAi.DTO.Message;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@RestController
@Slf4j
public class ChatController {

	@Qualifier("openaiRestTemplate")
	@Autowired
	private RestTemplate restTemplate;

	@Value("${openai.model}")
	private String model;

	@Value("${openai.api.url}")
	private String apiUrl;

	private int i;
	private List<Message> conversationHistory;

	private List<Message> normalConversation = new ArrayList<>();

	@GetMapping("/chat")
	public String chatBot(@RequestBody Body body) {

		Message userMessage = new Message("user", body.getPrompt());

		normalConversation.add(userMessage);

		ChatRequest chatRequest = new ChatRequest(model, normalConversation);

		ChatResponse response = restTemplate.postForObject(apiUrl, chatRequest, ChatResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			return "No response";
		}

		String aiResponse = response.getChoices().get(0).getMessage().getContent();

		Message aiMessage = new Message("assistant", aiResponse);

		normalConversation.add(aiMessage);

		return aiResponse;
	}

	@GetMapping("/interview/{sub}")
	public String chat(@PathVariable String sub) {

		conversationHistory = new ArrayList<>();
		String subject = "";

		if (sub.equals("java")) {
			subject += "Java, CoreJava, My sql , Hibernate , Jdbc , Jpa , OOPs , Spring , Spring Boot, Spring Framework ,Restful";
			i = 1;
		} else if (sub.equals("nodejs")) {
			subject += "Node.js Basics, Core Modules and NPM, Express.js, RESTful APIs and HTTP, Database Integration, Authentication and Security";

		} else if (sub.equals("mern")) {
			subject += "ReactJS Basics,Component Lifecycle,State and Props,React Router,Handling Forms in React,Working with APIs and AJAX,Redux State Management,React Hooks,Higher-Order Components (HOC),Context API,Error Boundaries,React Testing Library,Code Splitting in React,Server-Side Rendering (SSR),React Performance Optimization\r\n"
					+ "";
		}

		String prompt = "Act as an interviewer and ask me exactly one question from the below topics." + subject
				+ "And give the Question in Json Format {message:\"your Response\"}";
		Message userMessage = new Message("user", prompt);

		conversationHistory.add(userMessage);

		ChatRequest chatRequest = new ChatRequest(model, conversationHistory);

		ChatResponse response = restTemplate.postForObject(apiUrl, chatRequest, ChatResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			return "No response";
		}

		String aiResponse = response.getChoices().get(0).getMessage().getContent();

		Message aiMessage = new Message("assistant", aiResponse);

		conversationHistory.add(aiMessage);

		return aiResponse;
	}

	@PostMapping("/interview")
	public String submit(@RequestBody Body body) {

		if (conversationHistory.size() <= 20) {
			i++;
			if (i == 9) {

				String prompt = "This is the Answer For the Previous Question " + body.getPrompt()
						+ "Ask the Next Question(Algorithimic problem) on Arrays or String or Stack or Queue"
						+ "give the Question in Json Format {message:\"your Response\"}";

				Message userMessage = new Message("user", prompt);

				conversationHistory.add(userMessage);

				ChatRequest chatRequest = new ChatRequest(model, conversationHistory);

				ChatResponse response = restTemplate.postForObject(apiUrl, chatRequest, ChatResponse.class);

				if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
					return "No response";
				}

				String aiResponse = response.getChoices().get(0).getMessage().getContent();

				Message aiMessage = new Message("assistant", aiResponse);

				conversationHistory.add(aiMessage);

				return aiResponse;
			} else {
				String prompt = "This is the Answer For the Previous Question " + body.getPrompt()
						+ "Ask the Next Question" + "give the Question in Json Format {message:\"your Response\"}";

				Message userMessage = new Message("user", prompt);

				conversationHistory.add(userMessage);

				ChatRequest chatRequest = new ChatRequest(model, conversationHistory);

				ChatResponse response = restTemplate.postForObject(apiUrl, chatRequest, ChatResponse.class);

				if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
					return "No response";
				}

				String aiResponse = response.getChoices().get(0).getMessage().getContent();

				Message aiMessage = new Message("assistant", aiResponse);

				conversationHistory.add(aiMessage);

				return aiResponse;
			}

		} else {
			String prompt = "End this Interview And Provide Feedback From the Previous Response based on Communication, Problem Solving, Technical Knowledge, Algorithmic Knowledge, Data Structure Proficiency, Coding Ability, Analytical Thinking, Time and Space Complexity Analysis, Error Handling and Edge Cases. In a Scale of 1 to 10 (1 being the lowest and 10 being the highest), please provide your assessment for each category.\n\n"
				    + "Example JSON Response Format: {\"message\": \"Thanks For Attending the Interview\", \"score\": {\"communication\": score, \"problem_solving\": score, \"technical_knowledge\": score, \"algorithmic_knowledge\": score, \"data_structure_proficiency\": score, \"coding_ability\": score, \"analytical_thinking\": score, \"time_space_complexity\": score, \"error_handling_edge_cases\": score}}";

			Message userMessage = new Message("user", prompt);

			conversationHistory.add(userMessage);

			ChatRequest chatRequest = new ChatRequest(model, conversationHistory);

			ChatResponse response = restTemplate.postForObject(apiUrl, chatRequest, ChatResponse.class);

			if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
				return "No response";
			}

			String aiResponse = response.getChoices().get(0).getMessage().getContent();

			Message aiMessage = new Message("assistant", aiResponse);

			conversationHistory.add(aiMessage);

			return aiResponse;
		}

	}

	@GetMapping("/End")
	public String end() {

		String prompt = "End this Interview And Provide Feedback From the Previous Response based on Communication, Problem Solving, Technical Knowledge, Algorithmic Knowledge, Data Structure Proficiency, Coding Ability, Analytical Thinking, Time and Space Complexity Analysis, Error Handling and Edge Cases. In a Scale of 1 to 10 (1 being the lowest and 10 being the highest), please provide your assessment for each category.\n\n"
			    + "Example JSON Response Format: {\"message\": \"Thanks For Attending the Interview\", \"score\": {\"communication\": score, \"problem_solving\": score, \"technical_knowledge\": score, \"algorithmic_knowledge\": score, \"data_structure_proficiency\": score, \"coding_ability\": score, \"analytical_thinking\": score, \"time_space_complexity\": score, \"error_handling_edge_cases\": score}}";

		Message userMessage = new Message("user", prompt);

		conversationHistory.add(userMessage);

		ChatRequest chatRequest = new ChatRequest(model, conversationHistory);

		ChatResponse response = restTemplate.postForObject(apiUrl, chatRequest, ChatResponse.class);

		if (response == null || response.getChoices() == null || response.getChoices().isEmpty()) {
			return "No response";
		}

		String aiResponse = response.getChoices().get(0).getMessage().getContent();

		Message aiMessage = new Message("assistant", aiResponse);

		conversationHistory.add(aiMessage);

		return aiResponse;
	}

}
