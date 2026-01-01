// Question class to represent each quiz question
class Question {
    constructor(data) {
        this.id = data.id || Question.generateId();
        this.question = data.question;
        this.options = data.options;
        this.correctAnswer = data.correctAnswer;
        this.explanation = data.explanation;
        this.category = data.category || 'JavaScript'; // Default category
        this.difficulty = data.difficulty || 'medium'; // Default difficulty
    }

    static generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    isCorrect(answer) {
        return answer.trim() === this.correctAnswer.trim();
    }

    toJSON() {
        return {
            id: this.id,
            question: this.question,
            options: this.options,
            correctAnswer: this.correctAnswer,
            explanation: this.explanation,
            category: this.category,
            difficulty: this.difficulty
        };
    }
}

// Load questions from JSON file
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error('Failed to load questions');
        }
        const data = await response.json();
        return data.questions.map(q => new Question(q));
    } catch (error) {
        console.error('Error loading questions:', error);
        return [];
    }
}

// Initialize with a Promise that resolves to the questions
const questionsPromise = loadQuestions();

export { Question, questionsPromise as questions };