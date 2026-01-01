import { Question, questions } from './questions.js';
import { QuizManager } from './quiz-manager.js';
import { QuizUIManager } from './quiz-ui.js';

// Initialize quiz system
const quizManager = new QuizManager();
const quizUI = new QuizUIManager(quizManager);

// Loading state elements
const loadingEl = document.createElement('div');
loadingEl.className = 'loading-container';
loadingEl.innerHTML = `
    <div class="loading-spinner"></div>
    <p>Loading questions...</p>
`;
document.body.appendChild(loadingEl);

// Add loading spinner styles
const style = document.createElement('style');
style.textContent = `
    .loading-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 5px solid var(--surface);
        border-top: 5px solid var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize quiz with loaded questions
async function initializeQuiz() {
    try {
        const loadedQuestions = await questions;
        
        if (!loadedQuestions || loadedQuestions.length === 0) {
            throw new Error('No questions loaded');
        }

        // Set questions in quiz manager
        quizManager.questions = loadedQuestions;

        // Generate question selection buttons
        quizUI.generateQuestionSelectionButtons(loadedQuestions.length);

        // Remove loading spinner
        loadingEl.remove();

        // Show question selection screen
        document.getElementById('question-selection').style.display = 'block';
    } catch (error) {
        console.error('Failed to initialize quiz:', error);
        loadingEl.innerHTML = `
            <div class="error-message">
                <p>Failed to load questions. Please refresh the page to try again.</p>
                <button onclick="window.location.reload()">Refresh Page</button>
            </div>
        `;
    }
}

// Start initialization
initializeQuiz();