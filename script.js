class TypeFlow {
    constructor() {
        this.words = [
            'time', 'work', 'first', 'way', 'long', 'make', 'thing', 'see', 'two', 'how', 'its', 'day', 'get', 'has', 'had',
            'what', 'say', 'her', 'would', 'one', 'our', 'out', 'them', 'take', 'just', 'come', 'like', 'think', 'back',
            'know', 'want', 'give', 'data', 'structure', 'array', 'object', 'class', 'method', 'value', 'scope', 'async',
            'await', 'promise', 'event', 'listener', 'queue', 'stack', 'memory', 'syntax', 'compile', 'debug', 'system',
            'network', 'server', 'client', 'module', 'package', 'function', 'variable', 'constant', 'return', 'import',
            'export', 'framework', 'design', 'minimal', 'focus', 'habit', 'speed', 'accuracy', 'typing', 'result', 'learn',
            'build', 'repeat', 'small', 'clear', 'better', 'clean', 'strong', 'rhythm', 'practice', 'daily', 'target',
            'screen', 'button', 'theme', 'paper', 'midnight', 'flow', 'track', 'progress', 'streak', 'session', 'words'
        ];

        this.currentWords = [];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.userInput = '';

        this.isTyping = false;
        this.startTime = null;
        this.endTime = null;
        this.timer = null;

        this.mode = 'time';
        this.timeLimit = 30;
        this.timeLeft = this.timeLimit;
        this.wordsLimit = 25;
        this.wordsCompleted = 0;

        this.correctChars = 0;
        this.totalChars = 0;
        this.errors = 0;
        this.streak = 0;
        this.bestWpm = 0;
        this.theme = 'midnight';

        this.storageKey = 'typefl0.preferences';
        this.bestKey = 'typefl0.bestWpm';

        this.elements = {
            typingText: document.getElementById('typingText'),
            cursor: document.getElementById('cursor'),
            hiddenInput: document.getElementById('hiddenInput'),
            resultsArea: document.getElementById('resultsArea'),
            wpmValue: document.getElementById('wpmValue'),
            accValue: document.getElementById('accValue'),
            timeValue: document.getElementById('timeValue'),
            timerValue: document.getElementById('timerValue'),
            restartTestBtn: document.getElementById('restartTestBtn'),
            commandLine: document.getElementById('commandLine'),
            feedbackLine: document.getElementById('feedbackLine'),
            progressFill: document.getElementById('progressFill'),
            themeToggleBtn: document.getElementById('themeToggleBtn'),
            themeLabel: document.getElementById('themeLabel'),
            timeOptions: document.getElementById('timeOptions'),
            wordsOptions: document.getElementById('wordsOptions'),
            resultsFootnote: document.getElementById('resultsFootnote')
        };

        this.punctuationEnabled = false;
        this.numbersEnabled = false;

        this.loadPreferences();
        this.init();
    }

    init() {
        this.applyTheme();
        this.syncControls();
        this.updateTimerDisplay();
        this.updateProgress();
        this.updateFeedbackLine('ready when you are.');
        this.generateWords();
        this.setupEventListeners();
        this.updateCursor();
        this.focusInput();
        this.setCursorBlinking(true);
    }

    loadPreferences() {
        try {
            const preferencesRaw = localStorage.getItem(this.storageKey);
            if (preferencesRaw) {
                const prefs = JSON.parse(preferencesRaw);
                this.mode = prefs.mode || this.mode;
                // Keep 30s as the default startup time.
                this.timeLimit = 30;
                this.wordsLimit = prefs.wordsLimit ?? this.wordsLimit;
                this.punctuationEnabled = Boolean(prefs.punctuationEnabled);
                this.numbersEnabled = Boolean(prefs.numbersEnabled);
                this.theme = prefs.theme || this.theme;
                this.timeLeft = this.timeLimit;
            }

            const bestRaw = localStorage.getItem(this.bestKey);
            if (bestRaw) {
                this.bestWpm = Number(bestRaw) || 0;
            }
        } catch (error) {
            // Ignore storage errors.
        }
    }

    savePreferences() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify({
                mode: this.mode,
                timeLimit: this.timeLimit,
                wordsLimit: this.wordsLimit,
                punctuationEnabled: this.punctuationEnabled,
                numbersEnabled: this.numbersEnabled,
                theme: this.theme
            }));
            localStorage.setItem(this.bestKey, String(this.bestWpm));
        } catch (error) {
            // Ignore storage errors.
        }
    }

    applyTheme() {
        const activeTheme = this.theme === 'paper' ? 'paper' : 'midnight';
        document.body.setAttribute('data-theme', activeTheme);
        if (this.elements.themeLabel) {
            this.elements.themeLabel.textContent = activeTheme;
        }
    }

    syncControls() {
        document.querySelectorAll('.setting-btn').forEach(btn => {
            const setting = btn.getAttribute('data-setting');
            if (setting === 'punctuation') {
                btn.classList.toggle('active', this.punctuationEnabled);
            }
            if (setting === 'numbers') {
                btn.classList.toggle('active', this.numbersEnabled);
            }
        });

        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-mode') === this.mode);
        });

        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.trim() === String(this.timeLimit));
        });

        document.querySelectorAll('.words-btn').forEach(btn => {
            btn.classList.toggle('active', btn.textContent.trim() === String(this.wordsLimit));
        });

        if (this.elements.timeOptions && this.elements.wordsOptions) {
            this.elements.timeOptions.style.display = this.mode === 'time' ? 'inline-flex' : 'none';
            this.elements.wordsOptions.style.display = this.mode === 'words' ? 'inline-flex' : 'none';
        }
    }

    setupEventListeners() {
        this.elements.hiddenInput.addEventListener('input', (e) => {
            this.handleInput(e.target.value);
        });

        this.elements.hiddenInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                this.handleBackspace();
            }
        });

        document.addEventListener('click', () => {
            this.focusInput();
        });

        let tabPressed = false;
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                this.restart();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                tabPressed = true;
                setTimeout(() => { tabPressed = false; }, 1000);
            } else if (e.key === 'Enter' && tabPressed) {
                e.preventDefault();
                this.restart();
                tabPressed = false;
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.toggleCommandLine();
            }
        });

        this.elements.restartTestBtn.addEventListener('click', () => {
            this.restart();
        });

        if (this.elements.themeToggleBtn) {
            this.elements.themeToggleBtn.addEventListener('click', () => {
                this.theme = this.theme === 'paper' ? 'midnight' : 'paper';
                this.applyTheme();
                this.savePreferences();
            });
        }

        document.querySelectorAll('.setting-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleSetting(e.currentTarget);
            });
        });

        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setMode(e.currentTarget.getAttribute('data-mode'));
            });
        });

        document.querySelectorAll('.time-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setTimeLimit(e.currentTarget.textContent);
            });
        });

        document.querySelectorAll('.words-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setWordsLimit(e.currentTarget.textContent);
            });
        });

        window.addEventListener('resize', () => {
            if (!this.isTyping) {
                this.generateWords();
                this.updateCursor();
            }
        });
    }

    focusInput() {
        this.elements.hiddenInput.focus();
    }

    toggleSetting(button) {
        const setting = button.getAttribute('data-setting');
        if (setting === 'punctuation') {
            this.punctuationEnabled = !this.punctuationEnabled;
        }
        if (setting === 'numbers') {
            this.numbersEnabled = !this.numbersEnabled;
        }
        this.savePreferences();
        this.restart();
    }

    setMode(mode) {
        this.mode = mode === 'words' ? 'words' : 'time';
        this.savePreferences();
        this.syncControls();
        this.restart();
    }

    setTimeLimit(time) {
        this.timeLimit = parseInt(time, 10);
        this.timeLeft = this.timeLimit;
        this.savePreferences();
        this.syncControls();
        this.restart();
    }

    setWordsLimit(words) {
        this.wordsLimit = parseInt(words, 10);
        this.savePreferences();
        this.syncControls();
        this.restart();
    }

    generateWords() {
        this.currentWords = [];
        const punctuationMarks = ['.', ',', '!', '?', ';', ':'];
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        const requested = this.mode === 'words'
            ? Math.max(this.wordsLimit - this.wordsCompleted, 1)
            : 60;

        for (let i = 0; i < requested; i++) {
            const randomIndex = Math.floor(Math.random() * this.words.length);
            let word = this.words[randomIndex];

            if (this.numbersEnabled && Math.random() < 0.1) {
                const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
                word = randomNumber + word;
            }

            if (this.punctuationEnabled) {
                if (Math.random() < 0.22 && word.length > 0) {
                    word = word[0].toUpperCase() + word.slice(1);
                }
                if (Math.random() < 0.18 && !punctuationMarks.includes(word[word.length - 1])) {
                    const randomPunctuation = punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
                    word += randomPunctuation;
                }
            }

            this.currentWords.push(word);
        }

        this.renderWords();
        this.fitWordsToThreeLines();
    }

    renderWords() {
        this.elements.typingText.innerHTML = '';

        this.currentWords.forEach((word, wordIndex) => {
            const wordElement = document.createElement('span');
            wordElement.className = 'word';
            wordElement.setAttribute('data-word-index', String(wordIndex));

            for (let i = 0; i < word.length; i++) {
                const letterElement = document.createElement('span');
                letterElement.className = 'letter';
                letterElement.textContent = word[i];
                letterElement.setAttribute('data-char-index', String(i));
                wordElement.appendChild(letterElement);
            }

            if (wordIndex < this.currentWords.length - 1) {
                const spaceElement = document.createElement('span');
                spaceElement.className = 'letter space';
                spaceElement.textContent = ' ';
                spaceElement.setAttribute('data-char-index', String(word.length));
                wordElement.appendChild(spaceElement);
            }

            this.elements.typingText.appendChild(wordElement);
        });

        this.updateWordHighlight();
    }

    fitWordsToThreeLines() {
        const wordElements = [...this.elements.typingText.querySelectorAll('.word')];
        if (wordElements.length === 0) {
            return;
        }

        const lines = new Set();
        let keepUntil = wordElements.length - 1;

        for (let i = 0; i < wordElements.length; i++) {
            lines.add(wordElements[i].offsetTop);
            if (lines.size > 3) {
                keepUntil = i - 1;
                break;
            }
        }

        if (keepUntil < 1) {
            keepUntil = Math.min(wordElements.length - 1, 8);
        }

        this.currentWords = this.currentWords.slice(0, keepUntil + 1);
        wordElements.forEach((wordElement, index) => {
            if (index > keepUntil) {
                wordElement.remove();
            }
        });

        [...this.elements.typingText.querySelectorAll('.word')].forEach((wordElement, index) => {
            wordElement.setAttribute('data-word-index', String(index));
        });
    }

    getCurrentWord() {
        return this.currentWords[this.currentWordIndex] || '';
    }

    getCurrentWordElement() {
        return this.elements.typingText.querySelector(`[data-word-index="${this.currentWordIndex}"]`);
    }

    handleInput(value) {
        if (!this.isTyping) {
            this.startTest();
            this.setCursorBlinking(false);
        }

        this.userInput = value;
        this.updateDisplay();
        this.updateCursor();

        if (value.endsWith(' ')) {
            this.completeWord();
        }

        this.updateFeedback();
    }

    handleBackspace() {
        this.userInput = this.userInput.slice(0, -1);
        this.elements.hiddenInput.value = this.userInput;
        this.updateDisplay();
        this.updateCursor();
    }

    updateDisplay() {
        const currentWord = this.getCurrentWord();
        const wordElement = this.getCurrentWordElement();

        if (!wordElement || !currentWord) {
            return;
        }

        const letters = wordElement.querySelectorAll('.letter:not(.space)');

        letters.forEach(letter => {
            letter.classList.remove('correct', 'incorrect', 'extra');
        });

        wordElement.querySelectorAll('.letter.extra').forEach(extraLetter => extraLetter.remove());

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
                const extraLetter = document.createElement('span');
                extraLetter.className = 'letter extra';
                extraLetter.textContent = this.userInput[i];
                const spaceNode = wordElement.querySelector('.space');
                if (spaceNode) {
                    wordElement.insertBefore(extraLetter, spaceNode);
                } else {
                    wordElement.appendChild(extraLetter);
                }
            }
        }

        this.currentCharIndex = this.userInput.length;
    }

    completeWord() {
        const currentWord = this.getCurrentWord();
        const typedWord = this.userInput.trim();
        const wordElement = this.getCurrentWordElement();

        if (!currentWord || !wordElement) {
            return;
        }

        if (typedWord === currentWord) {
            wordElement.classList.add('correct');
            this.correctChars += currentWord.length + 1;
            this.streak += 1;
        } else {
            wordElement.classList.add('incorrect');
            this.errors += 1;
            this.streak = 0;
        }

        this.totalChars += currentWord.length + 1;
        this.wordsCompleted += 1;

        this.currentWordIndex += 1;
        this.currentCharIndex = 0;
        this.userInput = '';
        this.elements.hiddenInput.value = '';

        if (this.mode === 'words' && this.wordsCompleted >= this.wordsLimit) {
            this.endTest();
            return;
        }

        if (this.currentWordIndex >= this.currentWords.length) {
            this.currentWordIndex = 0;
            this.currentCharIndex = 0;
            this.generateWords();
        }

        this.updateWordHighlight();
        this.updateCursor();
        this.updateProgress();
        this.updateFeedback();
    }

    updateWordHighlight() {
        this.elements.typingText.querySelectorAll('.word').forEach(word => {
            word.classList.remove('current');
        });

        const currentWordElement = this.getCurrentWordElement();
        if (currentWordElement) {
            currentWordElement.classList.add('current');
        }
    }

    updateCursor() {
        const currentWordElement = this.getCurrentWordElement();
        if (!currentWordElement) {
            return;
        }

        const letters = currentWordElement.querySelectorAll('.letter');
        if (letters.length === 0) {
            return;
        }

        const textLetters = currentWordElement.querySelectorAll('.letter:not(.space)');
        let target = letters[Math.min(this.currentCharIndex, letters.length - 1)];
        let offset = 0;

        if (this.currentCharIndex >= textLetters.length) {
            offset = target.getBoundingClientRect().width;
        }

        const rect = target.getBoundingClientRect();
        const containerRect = this.elements.typingText.getBoundingClientRect();

        this.elements.cursor.style.left = `${rect.left - containerRect.left + offset}px`;
        this.elements.cursor.style.top = `${rect.top - containerRect.top}px`;
    }

    startTest() {
        this.isTyping = true;
        this.startTime = Date.now();

        if (this.mode === 'time') {
            this.timeLeft = this.timeLimit;
            this.updateTimerDisplay();
            this.timer = setInterval(() => {
                this.timeLeft -= 1;
                this.updateTimerDisplay();
                this.updateProgress();
                this.updateFeedback();
                if (this.timeLeft <= 0) {
                    this.endTest();
                }
            }, 1000);
        }

        this.updateFeedback();
    }

    endTest() {
        if (!this.isTyping) {
            return;
        }

        this.isTyping = false;
        this.endTime = Date.now();

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.setCursorBlinking(true);
        this.calculateResults();
        this.showResults();
    }

    calculateResults() {
        const previousBest = this.bestWpm;
        const elapsedMinutes = this.startTime ? Math.max((this.endTime - this.startTime) / 1000 / 60, 1 / 120) : 1 / 120;
        const wpm = Math.round((this.correctChars / 5) / elapsedMinutes) || 0;
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 0;

        if (wpm > this.bestWpm) {
            this.bestWpm = wpm;
            this.savePreferences();
        }

        this.elements.wpmValue.textContent = String(wpm);
        this.elements.accValue.textContent = `${accuracy}%`;
        this.elements.timeValue.textContent = this.mode === 'words' ? `${this.wordsCompleted}w` : `${this.timeLimit}s`;

        if (this.elements.resultsFootnote) {
            this.elements.resultsFootnote.textContent = wpm > previousBest
                ? 'new personal best saved.'
                : `best wpm: ${this.bestWpm}`;
        }

        this.updateFeedbackLine(wpm > previousBest ? 'new best set.' : 'session complete.');
    }

    showResults() {
        this.elements.typingText.style.display = 'none';
        this.elements.cursor.classList.add('hidden');
        this.elements.resultsArea.style.display = 'flex';

        if (this.elements.timerValue && this.elements.timerValue.parentElement) {
            this.elements.timerValue.parentElement.style.display = 'none';
        }
    }

    restart() {
        this.currentWords = [];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.userInput = '';

        this.isTyping = false;
        this.startTime = null;
        this.endTime = null;
        this.timeLeft = this.timeLimit;
        this.wordsCompleted = 0;

        this.correctChars = 0;
        this.totalChars = 0;
        this.errors = 0;
        this.streak = 0;

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.elements.hiddenInput.value = '';
        this.elements.typingText.style.display = 'flex';
        this.elements.cursor.classList.remove('hidden');
        this.elements.resultsArea.style.display = 'none';
        if (this.elements.commandLine) {
            this.elements.commandLine.style.display = 'none';
        }

        if (this.elements.timerValue && this.elements.timerValue.parentElement) {
            this.elements.timerValue.parentElement.style.display = 'flex';
        }

        this.syncControls();
        this.updateTimerDisplay();
        this.updateProgress();
        this.updateFeedbackLine('ready when you are.');

        this.generateWords();
        this.updateWordHighlight();
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

    updateFeedback() {
        const elapsedMinutes = this.isTyping && this.startTime
            ? Math.max((Date.now() - this.startTime) / 1000 / 60, 1 / 120)
            : 0;
        const wpm = elapsedMinutes > 0 ? Math.round((this.correctChars / 5) / elapsedMinutes) : 0;
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;

        if (!this.isTyping) {
            this.updateFeedbackLine('ready when you are.');
            return;
        }

        if (this.mode === 'words') {
            this.updateFeedbackLine(`${this.wordsCompleted}/${this.wordsLimit} words completed.`);
            return;
        }

        if (accuracy < 92) {
            this.updateFeedbackLine('slow down a notch. clean beats fast.');
        } else if (wpm >= this.bestWpm && wpm > 0) {
            this.updateFeedbackLine('on pace for a new best.');
        } else if (wpm >= 80) {
            this.updateFeedbackLine('strong pace. keep the rhythm.');
        } else {
            this.updateFeedbackLine('build the rhythm, one word at a time.');
        }
    }

    updateFeedbackLine(message) {
        if (this.elements.feedbackLine) {
            this.elements.feedbackLine.textContent = message;
        }
    }

    updateProgress() {
        if (!this.elements.progressFill) {
            return;
        }

        const progress = this.mode === 'words'
            ? (this.wordsLimit > 0 ? (this.wordsCompleted / this.wordsLimit) * 100 : 0)
            : (this.timeLimit > 0 ? ((this.timeLimit - this.timeLeft) / this.timeLimit) * 100 : 0);

        this.elements.progressFill.style.width = `${Math.max(0, Math.min(100, progress))}%`;
    }

    updateTimerDisplay() {
        if (!this.elements.timerValue) {
            return;
        }

        this.elements.timerValue.textContent = this.mode === 'words'
            ? String(this.wordsLimit)
            : String(this.timeLeft);
    }

    toggleCommandLine() {
        if (!this.elements.commandLine) {
            return;
        }

        const visible = this.elements.commandLine.style.display !== 'none';
        this.elements.commandLine.style.display = visible ? 'none' : 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TypeFlow();
});
