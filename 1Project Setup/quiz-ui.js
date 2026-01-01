class QuizUIManager {
    constructor(quizManager) {
        this.quizManager = quizManager;
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        // Selection screen elements
        this.questionSelectionEl = document.getElementById('question-selection');
        this.squaredOptionsEl = document.getElementById('squared-options');
        this.customQuestionCountEl = document.getElementById('custom-question-count');
        this.customStartBtnEl = document.getElementById('custom-start-btn');
        this.inputErrorEl = document.getElementById('input-error');

        // Quiz screen elements
        this.quizScreenEl = document.getElementById('quiz-screen');
        this.questionSideEl = document.getElementById('question-side');
        this.explanationSideEl = document.getElementById('explanation-side');
        this.questionEl = document.getElementById('question');
        this.optionEl = document.getElementById('options');
        this.scoreEl = document.getElementById('score');
        this.nextEl = document.getElementById('next');
        this.explanationTitleEl = document.getElementById('explanation-title');
        this.explanationTextEl = document.getElementById('explanation-text');

        // Add category and difficulty indicators
        this.createCategoryAndDifficultyIndicators();
    }

    createCategoryAndDifficultyIndicators() {
        // Create category and difficulty indicators
        const indicatorsDiv = document.createElement('div');
        indicatorsDiv.className = 'question-indicators';
        indicatorsDiv.innerHTML = `
            <div id="category-indicator" class="indicator">
                <span class="indicator-label">Category:</span>
                <span class="indicator-value"></span>
            </div>
            <div id="difficulty-indicator" class="indicator">
                <span class="indicator-label">Difficulty:</span>
                <span class="indicator-value"></span>
            </div>
        `;
        this.questionSideEl.insertBefore(indicatorsDiv, this.questionEl);

        // Store references to the indicators
        this.categoryIndicator = document.querySelector('#category-indicator .indicator-value');
        this.difficultyIndicator = document.querySelector('#difficulty-indicator .indicator-value');

        // Add CSS for indicators
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .question-indicators {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                    font-size: 0.9rem;
                }

                .indicator {
                    padding: 0.25rem 0.75rem;
                    border-radius: 1rem;
                    background: var(--surface);
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                }

                .indicator-label {
                    color: var(--text-secondary);
                }

                .indicator-value {
                    color: var(--primary);
                    font-weight: 600;
                }

                .difficulty-easy { color: var(--success) !important; }
                .difficulty-medium { color: var(--warning) !important; }
                .difficulty-hard { color: var(--error) !important; }
            </style>
        `);
    }

    setupEventListeners() {
        this.customQuestionCountEl.addEventListener('input', () => {
            this.inputErrorEl.textContent = '';
        });

        this.customQuestionCountEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.validateCustomInput()) {
                this.startQuiz(parseInt(this.customQuestionCountEl.value));
            }
        });

        this.customStartBtnEl.addEventListener('click', () => {
            if (this.validateCustomInput()) {
                this.startQuiz(parseInt(this.customQuestionCountEl.value));
            }
        });

        this.nextEl.addEventListener('click', () => this.handleNextQuestion());
    }

    generateQuestionSelectionButtons(totalQuestions) {
        // Clear existing buttons
        this.squaredOptionsEl.innerHTML = '';
        
        // Update information displays
        document.getElementById('total-questions-count').textContent = totalQuestions;
        document.getElementById('question-range').textContent = `1-${totalQuestions}`;
        document.getElementById('selected-questions-count').textContent = '0';
        
        // Generate multiples of 5 up to 30 or total questions (whichever is smaller)
        const maxQuickSelect = Math.min(30, totalQuestions);
        const multiplesOf5 = [];
        for (let i = 5; i <= maxQuickSelect; i += 5) {
            multiplesOf5.push(i);
        }
        
        // Add "30" if it's not already included and total questions is more than 30
        if (totalQuestions > 30 && !multiplesOf5.includes(30)) {
            multiplesOf5.push(30);
        }

        // Create buttons for each multiple of 5
        multiplesOf5.forEach(count => {
            const btn = document.createElement('button');
            btn.className = 'squared-option';
            btn.setAttribute('data-count', count);
            btn.textContent = count === totalQuestions ? 'All' : count;
            
            btn.addEventListener('click', () => {
                // Update selection visuals
                document.querySelectorAll('.squared-option').forEach(b => {
                    b.classList.remove('selected');
                });
                btn.classList.add('selected');
                
                // Update selected count display
                document.getElementById('selected-questions-count').textContent = count;
                
                // Clear custom input and any errors
                this.customQuestionCountEl.value = '';
                this.inputErrorEl.textContent = '';
                
                // Initialize quiz with selected count
                this.startQuiz(count);
            });
            
            this.squaredOptionsEl.appendChild(btn);
        });

        // Update custom input constraints and placeholder
        this.customQuestionCountEl.max = totalQuestions;
        this.customQuestionCountEl.min = 1;
        this.customQuestionCountEl.placeholder = `Enter number between 1-${totalQuestions}`;
        
        // Add input handler for custom count
        this.customQuestionCountEl.addEventListener('input', () => {
            const value = parseInt(this.customQuestionCountEl.value);
            if (!isNaN(value)) {
                document.getElementById('selected-questions-count').textContent = value;
            } else {
                document.getElementById('selected-questions-count').textContent = '0';
            }
        });
    }

    validateCustomInput() {
        const inputValue = parseInt(this.customQuestionCountEl.value);
        const totalQuestions = this.quizManager.questions.length;
        
        // Check if input is empty
        if (!this.customQuestionCountEl.value.trim()) {
            this.inputErrorEl.textContent = 'Please enter a number';
            return false;
        }
        
        // Check if input is a valid number
        if (isNaN(inputValue)) {
            this.inputErrorEl.textContent = 'Please enter a valid number';
            return false;
        }
        
        // Check if number is within valid range
        if (inputValue < 1 || inputValue > totalQuestions) {
            this.inputErrorEl.textContent = `Please enter a number between 1 and ${totalQuestions}`;
            return false;
        }
        
        // Check if number is a whole number
        if (!Number.isInteger(inputValue)) {
            this.inputErrorEl.textContent = 'Please enter a whole number';
            return false;
        }
        
        // Clear any error messages
        this.inputErrorEl.textContent = '';
        
        // Clear any squared options selection
        document.querySelectorAll('.squared-option').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Update selected count display
        document.getElementById('selected-questions-count').textContent = inputValue;
        
        return true;
    }

    startQuiz(questionCount) {
        // Initialize quiz
        const initResult = this.quizManager.initialize(this.quizManager.questions, questionCount);
        
        if (initResult.success) {
            // Update UI
            this.questionSelectionEl.style.display = 'none';
            this.quizScreenEl.style.display = 'block';
            this.nextEl.style.display = 'inline-flex';
            
            // Initialize question numbers
            document.getElementById('current-question').textContent = '1';
            document.getElementById('total-questions').textContent = initResult.questionCount;
            document.getElementById('progress-fill').style.width = `${(1 / initResult.questionCount) * 100}%`;
            
            // Show first question
            this.showQuestion();
        } else {
            // Handle initialization error
            this.inputErrorEl.textContent = 'Failed to start quiz. Please try again.';
        }
    }

    showQuestion() {
        const currentQuestion = this.quizManager.getCurrentQuestion();
        const currentIndex = this.quizManager.currentQuesIndex + 1;
        const totalQuestions = this.quizManager.selectedQuestionCount;
        
        // Reset UI state
        this.explanationSideEl.classList.remove('slide-in');
        this.explanationSideEl.classList.add('slide-out');
        this.questionSideEl.classList.remove('answered');
        
        // Update question number and progress
        document.getElementById('current-question').textContent = currentIndex;
        document.getElementById('total-questions').textContent = totalQuestions;
        
        // Update progress bar
        const progressPercentage = (currentIndex / totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercentage}%`;
        
        // Update category and difficulty indicators
        this.categoryIndicator.textContent = currentQuestion.category;
        this.difficultyIndicator.textContent = currentQuestion.difficulty;
        this.difficultyIndicator.className = 'indicator-value difficulty-' + currentQuestion.difficulty;
        
        // Reset explanation content
        this.explanationTitleEl.textContent = 'Explanation';
        this.explanationTextEl.textContent = 'Select an answer to see the explanation here.';

        // Update question and options
        this.questionEl.textContent = currentQuestion.question;
        this.optionEl.innerHTML = '';

        this.quizManager.shuffleArray([...currentQuestion.options]).forEach(opt => {
            const btn = document.createElement('button');
            btn.textContent = opt;
            btn.addEventListener('click', () => this.handleOptionClick(opt));
            this.optionEl.appendChild(btn);
        });
    }

    handleOptionClick(selectedOption) {
        const result = this.quizManager.submitAnswer(selectedOption);
        
        // Update score
        this.scoreEl.textContent = `Score: ${result.score.toFixed(2)}/${this.quizManager.selectedQuestionCount} (${result.score >= 0 ? '+' : ''}${result.score.toFixed(2)})`;
        
        // Show explanation
        this.showExplanation(result.isCorrect, selectedOption, result.correctAnswer, result.explanation);
        
        // Set auto-advance timer
        this.quizManager.setAutoAdvanceTimer(() => this.handleNextQuestion());
    }

    showExplanation(isCorrect, userAnswer, correctAnswer, explanation) {
        // Update explanation content
        this.explanationTitleEl.textContent = isCorrect ? '✅ Correct!' : '❌ Incorrect';
        this.explanationTitleEl.style.color = isCorrect ? 'var(--success)' : 'var(--error)';
        
        const explanationText = `
            <div style="margin-bottom: 1rem;">
                <strong style="color: var(--text-primary);">Your Answer:</strong> 
                <span style="color: ${isCorrect ? 'var(--success)' : 'var(--error)'}; font-weight: 600;">
                    ${userAnswer}
                </span>
            </div>
            <div style="margin-bottom: 1rem;">
                <strong style="color: var(--text-primary);">Correct Answer:</strong> 
                <span style="color: var(--success); font-weight: 600;">
                    ${correctAnswer}
                </span>
            </div>
            <div>
                <strong style="color: var(--text-primary);">Explanation:</strong><br>
                <span style="color: var(--text-secondary);">${explanation}</span>
            </div>
        `;
        
        this.explanationTextEl.innerHTML = explanationText;
        
        // Disable and style option buttons
        document.querySelectorAll('#options button').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.style.backgroundColor = 'var(--success)';
                btn.style.color = 'white';
            } else if (btn.textContent === userAnswer && !isCorrect) {
                btn.style.backgroundColor = 'var(--error)';
                btn.style.color = 'white';
            }
        });
        
        // Trigger animations
        setTimeout(() => {
            this.questionSideEl.classList.add('answered');
            this.explanationSideEl.classList.remove('slide-out');
            this.explanationSideEl.classList.add('slide-in');
        }, 100);
    }

    handleNextQuestion() {
        // Clear auto-advance timer if it exists
        this.quizManager.clearAutoAdvanceTimer();
        
        if (this.quizManager.nextQuestion()) {
            this.showQuestion();
        } else {
            this.showQuizResults();
        }
    }

    showQuizResults() {
        const results = this.quizManager.getQuizResults();
        const categoryStats = this.quizManager.getCategoryStats();
        const difficultyStats = this.quizManager.getDifficultyStats();
        
        // Hide explanation side and reset question side
        this.explanationSideEl.classList.remove('slide-in');
        this.explanationSideEl.classList.add('slide-out');
        this.questionSideEl.classList.remove('answered');
        
        this.questionEl.textContent = 'Quiz Completed!';
        this.optionEl.innerHTML = '';
        this.nextEl.style.display = 'none';
        
        const performanceMessage = this.quizManager.getPerformanceMessage(results.percentageScore);
        
        // Generate results HTML
        let resultsHTML = `
            <div class="detailed-response">
                <h2>📊 Detailed Results</h2>
                <div class="score-summary">
                    <div class="final-score">
                        <h3>${performanceMessage}</h3>
                        <p>Final Score: ${results.finalScore.toFixed(2)}/${results.totalQuestions} (${results.percentageScore.toFixed(1)}%)</p>
                    </div>
                    
                    <div class="statistics-grid">
                        <div class="stat-box correct">
                            <span class="stat-value">✅ ${results.correctAnswers}</span>
                            <span class="stat-label">Correct</span>
                        </div>
                        <div class="stat-box incorrect">
                            <span class="stat-value">❌ ${results.wrongAnswers}</span>
                            <span class="stat-label">Wrong</span>
                        </div>
                        <div class="stat-box skipped">
                            <span class="stat-value">⏭️ ${results.skipped}</span>
                            <span class="stat-label">Skipped</span>
                        </div>
                    </div>
                    
                    <div class="performance-breakdown">
                        <h3>Performance by Category</h3>
                        <div class="category-stats">
                            ${this.generateCategoryStatsHTML(categoryStats)}
                        </div>
                        
                        <h3>Performance by Difficulty</h3>
                        <div class="difficulty-stats">
                            ${this.generateDifficultyStatsHTML(difficultyStats)}
                        </div>
                    </div>
                </div>
                
                <div class="question-review">
                    <h3>Question Review</h3>
                    ${this.generateQuestionReviewHTML(results.answeredQuestions)}
                </div>
                
                <button id="restart-btn" class="restart-btn">🔄 Start New Quiz</button>
            </div>
        `;
        
        this.optionEl.innerHTML = resultsHTML;
        
        // Add CSS for results
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .detailed-response {
                    padding: 2rem;
                    max-width: 800px;
                    margin: 0 auto;
                }
                
                .statistics-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin: 2rem 0;
                }
                
                .stat-box {
                    background: var(--surface);
                    padding: 1rem;
                    border-radius: 8px;
                    text-align: center;
                }
                
                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    display: block;
                }
                
                .stat-label {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                
                .performance-breakdown {
                    margin: 2rem 0;
                }
                
                .category-stats, .difficulty-stats {
                    display: grid;
                    gap: 1rem;
                    margin: 1rem 0;
                }
                
                .stat-bar {
                    background: var(--surface);
                    padding: 1rem;
                    border-radius: 8px;
                }
                
                .stat-bar-inner {
                    height: 8px;
                    border-radius: 4px;
                    margin-top: 0.5rem;
                }
                
                .question-review {
                    margin-top: 2rem;
                }
                
                .question-item {
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    border-radius: 8px;
                    background: var(--surface);
                }
                
                .restart-btn {
                    margin-top: 2rem;
                    padding: 1rem 2rem;
                    font-size: 1.1rem;
                }
            </style>
        `);
        
        // Add restart handler
        document.getElementById('restart-btn').addEventListener('click', () => this.restartQuiz());
    }

    generateCategoryStatsHTML(categoryStats) {
        let html = '';
        categoryStats.forEach((stats, category) => {
            const percentage = (stats.correct / stats.total) * 100;
            html += `
                <div class="stat-bar">
                    <div class="stat-bar-header">
                        <strong>${category}</strong>
                        <span>${stats.correct}/${stats.total} (${percentage.toFixed(1)}%)</span>
                    </div>
                    <div class="stat-bar-inner" style="
                        background: linear-gradient(to right, 
                            var(--success) ${percentage}%, 
                            var(--error) ${percentage}%
                        );
                    "></div>
                </div>
            `;
        });
        return html;
    }

    generateDifficultyStatsHTML(difficultyStats) {
        let html = '';
        const difficulties = ['easy', 'medium', 'hard'];
        difficulties.forEach(difficulty => {
            if (difficultyStats.has(difficulty)) {
                const stats = difficultyStats.get(difficulty);
                const percentage = (stats.correct / stats.total) * 100;
                html += `
                    <div class="stat-bar">
                        <div class="stat-bar-header">
                            <strong class="difficulty-${difficulty}">${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</strong>
                            <span>${stats.correct}/${stats.total} (${percentage.toFixed(1)}%)</span>
                        </div>
                        <div class="stat-bar-inner" style="
                            background: linear-gradient(to right, 
                                var(--success) ${percentage}%, 
                                var(--error) ${percentage}%
                            );
                        "></div>
                    </div>
                `;
            }
        });
        return html;
    }

    generateQuestionReviewHTML(questions) {
        return questions.map((q, index) => `
            <div class="question-item ${q.isCorrect ? 'correct' : 'incorrect'}">
                <h4>Question ${index + 1} ${q.isCorrect ? '✅' : '❌'}</h4>
                <p class="question-text">${q.question}</p>
                <div class="answer-details">
                    <p>
                        <strong>Your Answer:</strong> 
                        <span style="color: ${q.isCorrect ? 'var(--success)' : 'var(--error)'}">
                            ${q.userAnswer}
                        </span>
                    </p>
                    <p>
                        <strong>Correct Answer:</strong> 
                        <span style="color: var(--success)">
                            ${q.correctAnswer}
                        </span>
                    </p>
                </div>
                <div class="question-meta">
                    <span class="category">Category: ${q.category}</span>
                    <span class="difficulty difficulty-${q.difficulty}">
                        Difficulty: ${q.difficulty}
                    </span>
                </div>
                <div class="explanation">
                    <strong>Explanation:</strong><br>
                    ${q.explanation}
                </div>
            </div>
        `).join('');
    }

    restartQuiz() {
        // Reset quiz state
        this.customQuestionCountEl.value = '';
        this.inputErrorEl.textContent = '';
        
        // Clear squared options selection
        document.querySelectorAll('.squared-option').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Show question selection screen
        this.questionSelectionEl.style.display = 'block';
        
        // Hide quiz screen
        this.quizScreenEl.style.display = 'none';
        
        // Reset next button
        this.nextEl.style.display = 'inline-flex';
    }
}

export { QuizUIManager };