package com.openAi.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.openAi.DTO.Body;
import com.openAi.DTO.ChatRequest;
import com.openAi.DTO.ChatResponse;
import com.openAi.DTO.Message;

@RestController
@Async
public class ChatController {

	@Qualifier("openaiRestTemplate")
	@Autowired
	private RestTemplate restTemplate;

	@Value("${openai.model}")
	private String model;

	@Value("${openai.api.url}")
	private String apiUrl;

	private List<Message> conversationHistory = new ArrayList<>();

	private List<Message> normalConversation=new ArrayList<>();
	
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
	
	@GetMapping("/start")
	public String chat(@RequestParam String sub) {

		String subject = "";

		if (sub.equals("Java")) {
			subject += "Java, CoreJava, My sql , Hibernate , Jdbc , Jpa , OOPs , Spring , Spring Boot, Spring Framework ,Restful";
		} else if (sub.equals("Node.Js")) {
            subject+="Node.js Basics, Core Modules and NPM, Express.js, RESTful APIs and HTTP, Database Integration, Authentication and Security";
            		
		} else if (sub.equals("Mern")) {
            subject+="ReactJS Basics,Component Lifecycle,State and Props,React Router,Handling Forms in React,Working with APIs and AJAX,Redux State Management,React Hooks,Higher-Order Components (HOC),Context API,Error Boundaries,React Testing Library,Code Splitting in React,Server-Side Rendering (SSR),React Performance Optimization\r\n"
            		+ "";
		}

		String prompt = "Act as an interviewer and Greet and ask me exactly one question from the below topics."
				+ subject;
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

	@PostMapping("/submit")
	public String submit(@RequestBody Body body) {

		String prompt = "This is the Answer For the Previous Question " + body.getPrompt()
				+ " Please Provide Feed back On scale of 10 for Subject Matter Experitise and Communication "
				+ "Ask the Next Question";

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

	@GetMapping("/End")
	public String end() {

		String prompt = "Lets End this Interview And Provide Average Scores Based On The Previous scores scored interms of Subject Matter Experise And Communication";
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
