class MonkeyTypeClone {
    constructor() {
        this.words = [
            'year', 'leave', 'with', 'more', 'in', 'system', 'late', 'off', 'during', 'large', 'mean', 'place',
            'life', 'must', 'you', 'she', 'look', 'use', 'by', 'into', 'group', 'leave', 'word', 'down', 'form',
            'know', 'problem', 'move', 'no', 'which', 'world', 'child', 'over', 'good', 'keep', 'own', 'word',
            'time', 'work', 'first', 'way', 'long', 'make', 'thing', 'see', 'him', 'two', 'how', 'its', 'who',
            'day', 'get', 'has', 'had', 'his', 'what', 'say', 'her', 'would', 'one', 'our', 'out', 'up', 'time',
            'them', 'take', 'just', 'come', 'could', 'like', 'go', 'think', 'back', 'know', 'want', 'give'
        ];
        
        this.currentWords = [];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.userInput = '';
        this.isTyping = false;
        this.startTime = null;
        this.endTime = null;
        this.timeLimit = 30;
        this.timer = null;
        this.timeLeft = this.timeLimit;
        this.correctChars = 0;
        this.totalChars = 0;
        this.errors = 0;
        
        this.elements = {
            typingText: document.getElementById('typingText'),
            cursor: document.getElementById('cursor'),
            hiddenInput: document.getElementById('hiddenInput'),
            resultsArea: document.getElementById('resultsArea'),
            wpmValue: document.getElementById('wpmValue'),
            accValue: document.getElementById('accValue'),
            timeValue: document.getElementById('timeValue'),
            commandLine: document.getElementById('commandLine'),
            timerValue: document.getElementById('timerValue'),
            restartTestBtn: document.getElementById('restartTestBtn')
        };
        
        this.punctuationEnabled = false;
        this.numbersEnabled = false;
        
        this.init();
    }
    
    init() {
        this.generateWords();
        this.setupEventListeners();
        this.updateCursor();
        this.focusInput();
        this.setCursorBlinking(true);
    }
    
    generateWords() {
        this.currentWords = [];
        const punctuationMarks = ['.', ',', '!', '?', ';', ':'];
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        
        for (let i = 0; i < 50; i++) {
            const randomIndex = Math.floor(Math.random() * this.words.length);
            let word = this.words[randomIndex];
            
            // Add punctuation if enabled
            if (this.punctuationEnabled && Math.random() < 0.2) {
                const randomPunct = punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
                word += randomPunct;
            }
            
            // Add numbers if enabled
            if (this.numbersEnabled && Math.random() < 0.1) {
                const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
                word = randomNumber + word;
            }
            
            this.currentWords.push(word);
        }
        this.renderWords();
    }
    
    renderWords() {
        this.elements.typingText.innerHTML = '';
        this.currentWords.forEach((word, wordIndex) => {
            const wordElement = document.createElement('span');
            wordElement.className = 'word';
            wordElement.setAttribute('data-word-index', wordIndex);
            
            for (let i = 0; i < word.length; i++) {
                const letterElement = document.createElement('span');
                letterElement.className = 'letter';
                letterElement.textContent = word[i];
                letterElement.setAttribute('data-char-index', i);
                wordElement.appendChild(letterElement);
            }
            
            this.elements.typingText.appendChild(wordElement);
            
            // Add space after word (except last word)
            if (wordIndex < this.currentWords.length - 1) {
                const spaceElement = document.createElement('span');
                spaceElement.className = 'letter space';
                spaceElement.textContent = ' ';
                spaceElement.setAttribute('data-char-index', word.length);
                wordElement.appendChild(spaceElement);
            }
        });
        
        this.updateWordHighlight();
    }
    
    setupEventListeners() {
        // Hidden input for capturing keystrokes
        this.elements.hiddenInput.addEventListener('input', (e) => {
            this.handleInput(e.target.value);
        });
        
        this.elements.hiddenInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                this.handleBackspace();
            }
        });
        
        // Focus management
        document.addEventListener('click', () => {
            this.focusInput();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                this.restart();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.toggleCommandLine();
            }
        });
        
        // Restart test button
        this.elements.restartTestBtn.addEventListener('click', () => {
            this.restart();
        });
        
        // Settings buttons
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setTimeLimit(e.target.textContent);
            });
        });
        
        document.querySelectorAll('.setting-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleSetting(e.target);
            });
        });
    }
    
    focusInput() {
        this.elements.hiddenInput.focus();
        document.body.classList.add('typing');
    }
    
    handleInput(value) {
        if (!this.isTyping) {
            this.startTest();
            this.setCursorBlinking(false);
        }
        
        this.userInput = value;
        this.updateDisplay();
        this.updateCursor();
        
        // Check if word is completed
        const currentWord = this.currentWords[this.currentWordIndex];
        if (value.endsWith(' ')) {
            this.completeWord();
        } else if (value.length > currentWord.length) {
            // Handle extra characters
            this.handleExtraChars();
        }
    }
    
    handleBackspace() {
        if (this.userInput.length > 0) {
            this.userInput = this.userInput.slice(0, -1);
            this.updateDisplay();
            this.updateCursor();
        } else if (this.currentWordIndex > 0) {
            // Go back to previous word
            this.currentWordIndex--;
            this.currentCharIndex = this.currentWords[this.currentWordIndex].length;
            this.userInput = this.currentWords[this.currentWordIndex];
            this.updateWordHighlight();
            this.updateDisplay();
            this.updateCursor();
        }
    }
    
    completeWord() {
        const currentWord = this.currentWords[this.currentWordIndex];
        const typedWord = this.userInput.trim();
        
        // Mark word as correct or incorrect
        const wordElement = document.querySelector(`[data-word-index="${this.currentWordIndex}"]`);
        if (typedWord === currentWord) {
            wordElement.classList.add('correct');
            this.correctChars += currentWord.length + 1; // +1 for space
        } else {
            wordElement.classList.add('incorrect');
            this.errors++;
        }
        
        this.totalChars += currentWord.length + 1;
        
        // Move to next word
        this.currentWordIndex++;
        this.currentCharIndex = 0;
        this.userInput = '';
        this.elements.hiddenInput.value = '';
        
        this.updateWordHighlight();
        this.updateCursor();
        
        // Check if test should end
        if (this.currentWordIndex >= this.currentWords.length) {
            this.endTest();
        }
    }
    
    updateDisplay() {
        const currentWord = this.currentWords[this.currentWordIndex];
        const wordElement = document.querySelector(`[data-word-index="${this.currentWordIndex}"]`);
        const letters = wordElement.querySelectorAll('.letter:not(.space)');
        
        // Reset letter classes
        letters.forEach(letter => {
            letter.classList.remove('correct', 'incorrect', 'extra');
        });
        
        // Update letter states
        for (let i = 0; i < Math.max(this.userInput.length, currentWord.length); i++) {
            if (i < letters.length) {
                const letter = letters[i];
                if (i < this.userInput.length) {
                    if (this.userInput[i] === currentWord[i]) {
                        letter.classList.add('correct');
                    } else {
                        letter.classList.add('incorrect');
                    }
                }
            } else if (i < this.userInput.length) {
                // Extra characters
                const extraLetter = document.createElement('span');
                extraLetter.className = 'letter extra';
                extraLetter.textContent = this.userInput[i];
                wordElement.insertBefore(extraLetter, wordElement.querySelector('.space'));
            }
        }
        
        this.currentCharIndex = this.userInput.length;
    }
    
    updateWordHighlight() {
        // Remove current class from all words
        document.querySelectorAll('.word').forEach(word => {
            word.classList.remove('current');
        });
        
        // Add current class to current word
        const currentWordElement = document.querySelector(`[data-word-index="${this.currentWordIndex}"]`);
        if (currentWordElement) {
            currentWordElement.classList.add('current');
        }
    }
    
    updateCursor() {
        const currentWordElement = document.querySelector(`[data-word-index="${this.currentWordIndex}"]`);
        if (!currentWordElement) return;
        
        const letters = currentWordElement.querySelectorAll('.letter');
        let targetLetter;
        
        if (this.currentCharIndex < letters.length - 1) {
            targetLetter = letters[this.currentCharIndex];
        } else {
            targetLetter = letters[letters.length - 1]; // Space or last letter
        }
        
        if (targetLetter) {
            const rect = targetLetter.getBoundingClientRect();
            const containerRect = this.elements.typingText.getBoundingClientRect();
            
            const left = rect.left - containerRect.left + (this.currentCharIndex >= currentWordElement.querySelectorAll('.letter:not(.space)').length ? rect.width : 0);
            const top = rect.top - containerRect.top;
            
            this.elements.cursor.style.left = `${left}px`;
            this.elements.cursor.style.top = `${top}px`;
        }
    }
    
    startTest() {
        this.isTyping = true;
        this.startTime = Date.now();
        this.timeLeft = this.timeLimit;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            if (this.timeLeft <= 0) {
                this.endTest();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        if (this.elements.timerValue) {
            this.elements.timerValue.textContent = this.timeLeft;
        }
    }
    
    endTest() {
        this.isTyping = false;
        this.endTime = Date.now();
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.setCursorBlinking(true);
        this.calculateResults();
        this.showResults();
    }
    
    calculateResults() {
        const timeElapsed = (this.endTime - this.startTime) / 1000 / 60; // in minutes
        const wpm = Math.round((this.correctChars / 5) / timeElapsed);
        const accuracy = Math.round((this.correctChars / this.totalChars) * 100);
        
        this.elements.wpmValue.textContent = wpm || 0;
        this.elements.accValue.textContent = `${accuracy || 0}%`;
        this.elements.timeValue.textContent = `${this.timeLimit}s`;
    }
    
    showResults() {
        this.elements.typingText.style.display = 'none';
        this.elements.resultsArea.style.display = 'flex';
        // Hide timer during results
        if (this.elements.timerValue && this.elements.timerValue.parentElement) {
            this.elements.timerValue.parentElement.style.display = 'none';
        }
        // Don't show command line anymore, user can use restart button
    }
    
    restart() {
        // Reset state
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.userInput = '';
        this.isTyping = false;
        this.startTime = null;
        this.endTime = null;
        this.timeLeft = this.timeLimit;
        this.correctChars = 0;
        this.totalChars = 0;
        this.errors = 0;
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Reset UI
        this.elements.hiddenInput.value = '';
        this.elements.typingText.style.display = 'flex';
        this.elements.resultsArea.style.display = 'none';
        this.elements.commandLine.style.display = 'none';
        // Show timer again
        if (this.elements.timerValue && this.elements.timerValue.parentElement) {
            this.elements.timerValue.parentElement.style.display = 'flex';
        }
        this.updateTimerDisplay();
        
        // Generate new words and reset display
        this.generateWords();
        this.updateCursor();
        this.focusInput();
        this.setCursorBlinking(true);
    }
    
    setCursorBlinking(shouldBlink) {
        if (shouldBlink) {
            this.elements.cursor.classList.add('blinking');
            this.elements.cursor.classList.remove('typing');
        } else {
            this.elements.cursor.classList.remove('blinking');
            this.elements.cursor.classList.add('typing');
        }
    }
    
    setTimeLimit(time) {
        this.timeLimit = parseInt(time);
        this.timeLeft = this.timeLimit;
        this.updateTimerDisplay();
        
        // Update button states
        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.restart();
    }
    
    toggleSetting(button) {
        const setting = button.getAttribute('data-setting');
        
        if (setting === 'punctuation') {
            this.punctuationEnabled = !this.punctuationEnabled;
            button.classList.toggle('active', this.punctuationEnabled);
            this.generateWords();
        } else if (setting === 'numbers') {
            this.numbersEnabled = !this.numbersEnabled;
            button.classList.toggle('active', this.numbersEnabled);
            this.generateWords();
        } else {
            button.classList.toggle('active');
        }
    }
    
    toggleCommandLine() {
        const isVisible = this.elements.commandLine.style.display !== 'none';
        this.elements.commandLine.style.display = isVisible ? 'none' : 'block';
    }
    
    handleExtraChars() {
        // This method handles when user types more characters than the word length
        // Implementation depends on specific requirements
    }
}

// Initialize the typing test when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MonkeyTypeClone();
});

// Additional utility functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Theme management (could be extended)
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
    }
    
    setTheme(theme) {
        document.body.className = theme;
        this.currentTheme = theme;
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// Keyboard shortcuts handler
document.addEventListener('keydown', (e) => {
    // Global shortcuts that work regardless of focus
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        // Toggle command palette
        console.log('Command palette toggled');
    }
    
    if (e.key === 'F1') {
        e.preventDefault();
        // Show help
        console.log('Help toggled');
    }
});

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.keystrokes = [];
        this.wpmHistory = [];
    }
    
    recordKeystroke(timestamp, char, isCorrect) {
        this.keystrokes.push({
            timestamp,
            char,
            isCorrect
        });
    }
    
    calculateRealtimeWPM() {
        // Calculate WPM based on recent keystrokes
        const now = Date.now();
        const recentKeystrokes = this.keystrokes.filter(k => now - k.timestamp < 5000);
        
        if (recentKeystrokes.length === 0) return 0;
        
        const timeSpan = (now - recentKeystrokes[0].timestamp) / 1000 / 60;
        const correctChars = recentKeystrokes.filter(k => k.isCorrect).length;
        
        return Math.round((correctChars / 5) / timeSpan);
    }
}

// Sound effects (optional)
class SoundManager {
    constructor() {
        this.enabled = false;
        this.sounds = {
            keypress: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEcBzuZ2/HBGAIAAgACAAAAABQF...'), // Placeholder base64 audio
            error: new Audio(),
            complete: new Audio()
        };
    }
    
    play(soundName) {
        if (this.enabled && this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play().catch(() => {
                // Ignore audio play errors
            });
        }
    }
    
    toggle() {
        this.enabled = !this.enabled;
    }
}
