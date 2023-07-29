import { useEffect, useState } from "react";
import img from "../images/hackk.png";
import {
  Badge,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface Score {
  communication: number;
  problem_solving: number;
  technical_knowledge: number;
}

export const ScoreBox = () => {
  const [score, setScore] = useState<Score>({
    communication: 0,
    problem_solving: 0,
    technical_knowledge: 0,
  });

  useEffect(() => {
    const storedScore = JSON.parse(localStorage.getItem("score") || "{}");
    setScore(storedScore);
  }, []);

  const { communication, problem_solving, technical_knowledge } = score;
  /*
  {
		"communication": 7,
		"problem_solving": 8,
		"technical_knowledge": 7
	} 
  */

  const technical = technical_knowledge;
  const problem = problem_solving;
  const commun = communication;
  const Interviewing: number = 7;
  const First: number = 5;

  const total: number = Math.floor(
    (technical + commun + problem + Interviewing + First) / 5
  );

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image objectFit="cover" boxSize="100%" src={img} alt="#" />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            Welcome!
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            Hey,User
          </Text>
          <Text
            textAlign={"center"}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            <Heading fontSize={"xl"} fontFamily={"body"}>
              Score: {total}
            </Heading>
            <br />
            {total > 5 ? (
              <Badge variant="solid" colorScheme="green" fontSize="xl">
                Hire
              </Badge>
            ) : (
              <Badge variant="solid" colorScheme="red" fontSize="xl">
                Reject
              </Badge>
            )}
          </Text>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Badge
              px={2}
              py={1}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #communication
            </Badge>
            <Badge
              px={2}
              py={1}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #Interviewing_Skill
            </Badge>
          </Stack>

          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          ></Stack>
        </Stack>
      </Stack>
    </Center>
  );
};
