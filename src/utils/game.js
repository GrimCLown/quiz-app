const question_api = "https://opentdb.com/api.php?amount=10";

export const fetchQuestions = async () => {
  const cachedQuestions = localStorage.getItem("quizQuestions");
  if (cachedQuestions) {
    return JSON.parse(cachedQuestions);
  }

  try {
    const res = await fetch(question_api);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    const data = await res.json();
    localStorage.setItem("quizQuestions", JSON.stringify(data.results)); // Cache the questions
    return data.results;
  } catch (error) {
    console.log("Error fetching questions:", error);
    throw error;
  }
};
