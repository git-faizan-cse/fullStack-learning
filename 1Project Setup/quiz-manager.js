class QuizManager {
    constructor() {
        this.score = 0;
        this.currentQuesIndex = 0;
        this.selectedQuestionCount = 0;
        this.shuffledQuestions = [];
        this.userAnswers = new Map(); // Using Map for better key-value pairing
        this.questions = [];
        this.isQuizComplete = false;
        this.autoAdvanceTimer = null;
    }

    initialize(questions, selectedCount = 5) {
        // Validate inputs
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error('Questions array must not be empty');
        }

        if (typeof selectedCount !== 'number' || selectedCount < 1) {
            throw new Error('Selected question count must be a positive number');
        }

        // Initialize quiz state
        this.questions = questions;
        
        // Ensure selectedCount is within valid range
        this.selectedQuestionCount = Math.min(Math.max(1, Math.floor(selectedCount)), questions.length);
        
        // Shuffle all questions first
        const shuffled = this.shuffleArray([...this.questions]);
        
        // Take only the requested number of questions
        this.shuffledQuestions = shuffled.slice(0, this.selectedQuestionCount);
        
        // Log initialization details
        console.log(`Quiz initialized with:
            - Total questions available: ${questions.length}
            - Requested question count: ${selectedCount}
            - Actual question count: ${this.shuffledQuestions.length}`);
            
        // Validate we have enough questions
        if (this.shuffledQuestions.length < selectedCount) {
            console.warn(`Only ${this.shuffledQuestions.length} questions available out of ${selectedCount} requested`);
        }
        
        // Reset quiz state
        this.score = 0;
        this.currentQuesIndex = 0;
        this.userAnswers.clear();
        this.isQuizComplete = false;
        
        // Clear any existing timers
        this.clearAutoAdvanceTimer();
        
        return {
            success: true,
            questionCount: this.shuffledQuestions.length,
            questions: this.shuffledQuestions
        };
    }

    getCurrentQuestion() {
        return this.shuffledQuestions[this.currentQuesIndex];
    }

    submitAnswer(answer) {
        const currentQuestion = this.getCurrentQuestion();
        const isCorrect = currentQuestion.isCorrect(answer);
        
        // Store answer details
        this.userAnswers.set(currentQuestion.id, {
            question: currentQuestion,
            userAnswer: answer,
            isCorrect: isCorrect
        });

        // Update score
        this.score += isCorrect ? 1 : -0.25;

        return {
            isCorrect,
            correctAnswer: currentQuestion.correctAnswer,
            explanation: currentQuestion.explanation,
            score: this.score
        };
    }

    nextQuestion() {
        this.currentQuesIndex++;
        this.isQuizComplete = this.currentQuesIndex >= this.shuffledQuestions.length;
        return this.isQuizComplete ? null : this.getCurrentQuestion();
    }

    getQuizResults() {
        const results = {
            finalScore: this.score,
            totalQuestions: this.selectedQuestionCount,
            correctAnswers: 0,
            wrongAnswers: 0,
            skipped: 0,
            percentageScore: 0,
            answeredQuestions: []
        };

        this.shuffledQuestions.forEach(question => {
            const answer = this.userAnswers.get(question.id);
            if (!answer) {
                results.skipped++;
            } else if (answer.isCorrect) {
                results.correctAnswers++;
            } else {
                results.wrongAnswers++;
            }

            results.answeredQuestions.push({
                question: question.question,
                userAnswer: answer ? answer.userAnswer : 'Not answered',
                correctAnswer: question.correctAnswer,
                isCorrect: answer ? answer.isCorrect : false,
                explanation: question.explanation,
                category: question.category,
                difficulty: question.difficulty
            });
        });

        results.percentageScore = (this.score / this.selectedQuestionCount) * 100;
        return results;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    setAutoAdvanceTimer(callback, delay = 6000) {
        if (this.autoAdvanceTimer) {
            clearTimeout(this.autoAdvanceTimer);
        }
        this.autoAdvanceTimer = setTimeout(callback, delay);
    }

    clearAutoAdvanceTimer() {
        if (this.autoAdvanceTimer) {
            clearTimeout(this.autoAdvanceTimer);
            this.autoAdvanceTimer = null;
        }
    }

    getPerformanceMessage(percentageScore) {
        if (percentageScore === 100) return '🌟 Perfect Score! Outstanding!';
        if (percentageScore >= 80) return '🎯 Excellent Performance!';
        if (percentageScore >= 60) return '👍 Good Job!';
        if (percentageScore >= 40) return '💪 Keep Practicing!';
        return '📚 More Review Needed';
    }

    getCategoryStats() {
        const stats = new Map();
        this.userAnswers.forEach((answer, questionId) => {
            const question = answer.question;
            if (!stats.has(question.category)) {
                stats.set(question.category, {
                    total: 0,
                    correct: 0,
                    incorrect: 0
                });
            }

            const categoryStats = stats.get(question.category);
            categoryStats.total++;
            if (answer.isCorrect) {
                categoryStats.correct++;
            } else {
                categoryStats.incorrect++;
            }
        });

        return stats;
    }

    getDifficultyStats() {
        const stats = new Map();
        this.userAnswers.forEach((answer, questionId) => {
            const question = answer.question;
            if (!stats.has(question.difficulty)) {
                stats.set(question.difficulty, {
                    total: 0,
                    correct: 0,
                    incorrect: 0
                });
            }

            const difficultyStats = stats.get(question.difficulty);
            difficultyStats.total++;
            if (answer.isCorrect) {
                difficultyStats.correct++;
            } else {
                difficultyStats.incorrect++;
            }
        });

        return stats;
    }
}

export { QuizManager };