import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Text,
  Heading,
  VStack,
  Spinner,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";

const appId = process.env.NEXT_PUBLIC_WOLFRAM_APP_ID;

export default function AIDiagnosis() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDiagnosis = async () => {
    setLoading(true);
    setDiagnosis(null);

    try {
      const response = await axios.get("/api/proxyDiagnosis", {
        params: {
          age: age,
          gender: gender,
          symptoms: symptoms,
        },
      });

      // Update diagnosis state with response data
      setDiagnosis(response.data);
    } catch (error) {
      setDiagnosis("An error occurred while fetching the diagnosis.");
      console.error("Diagnosis error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition="0.5s ease-in-out"
      minH="100vh"
      bgGradient="linear(to-b, blue.900, teal.600)"
      align="center"
      justify="center"
      p={6}
    >
      <Heading color="white" mb={8}>
        AI Diagnosis
      </Heading>

      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="xl"
        w="full"
        maxW="lg"
        as={motion.div}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Text mb={4}>Enter your details and symptoms:</Text>

        <Input
          placeholder="Age"
          mb={4}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <Select
          placeholder="Select Gender"
          mb={4}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Select>

        <Input
          placeholder="Enter your symptoms"
          mb={4}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <Button colorScheme="teal" size="lg" w="full" onClick={handleDiagnosis}>
          Get Diagnosis
        </Button>
      </Box>

      {loading ? (
        <Spinner size="xl" color="white" mt={8} />
      ) : (
        diagnosis && (
          <Box
            mt={8}
            p={6}
            bg="white"
            borderRadius="md"
            shadow="xl"
            textAlign="center"
            w="full"
            maxW="lg"
          >
            {/* Display the query if available */}
            {diagnosis.Query && (
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Query: {diagnosis.Query}
              </Text>
            )}

            {/* Display diagnosis probabilities if available */}
            {diagnosis["Diagnosis probabilities"] ? (
              <Box mb={4}>
                <Text fontWeight="bold">Diagnosis Probabilities:</Text>
                {Object.entries(diagnosis["Diagnosis probabilities"]).map(
                  ([condition, probability], index) => (
                    <Text key={index}>
                      {condition}: {probability}%
                    </Text>
                  )
                )}
              </Box>
            ) : (
              <Text>No diagnosis probabilities available.</Text>
            )}

            {/* Display the image if available */}
            {diagnosis.image && (
              <Image
                src={diagnosis.image}
                alt="Patient Characteristics"
                mb={4}
                borderRadius="md"
              />
            )}

            {/* Link to WolframAlpha if URL is available */}
            {diagnosis.websiteUrl && (
              <Button
                as="a"
                href={diagnosis.websiteUrl}
                target="_blank"
                colorScheme="teal"
              >
                View Detailed Report
              </Button>
            )}
          </Box>
        )
      )}
    </VStack>
  );
}
