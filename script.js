class MonkeyTypeClone {
    constructor() {
        this.words = [
            'year', 'leave', 'with', 'more', 'in', 'system', 'late', 'off', 'during', 'large', 'mean', 'place',
            'life', 'must', 'you', 'she', 'look', 'use', 'by', 'into', 'group', 'leave', 'word', 'down', 'form',
            'know', 'problem', 'move', 'no', 'which', 'world', 'child', 'over', 'good', 'keep', 'own', 'word',
            'time', 'work', 'first', 'way', 'long', 'make', 'thing', 'see', 'him', 'two', 'how', 'its', 'who',
            'day', 'get', 'has', 'had', 'his', 'what', 'say', 'her', 'would', 'one', 'our', 'out', 'up', 'time',
            'them', 'take', 'just', 'come', 'could', 'like', 'go', 'think', 'back', 'know', 'want', 'give', 'a', 
            'data', 'structure', 'used', 'to', 'store', 'data', 'values', 'in', 'key-value', 'pairs', 'where',
            'keys', 'are', 'unique', 'and', 'can', 'be', 'of', 'any', 'immutable', 'type', 'such', 'as', 'strings', 
            'numbers', 'or', 'tuples', 'containing', 'only', 'immutable', 'types.', 'is', 'best', 'thought', 'of', 
            'as', 'a', 'set', 'of', 'key:', 'value', 'pairs,', 'meaning', 'the', 'items', 'have', 'a', 'defined', 
            'order', 'that', 'will', 'not', 'change.', 'are', 'changeable,', 'allowing', 'items', 'to', 'be', 'added', 
            'removed,', 'or', 'modified', 'after', 'creation,', 'and', 'they', 'do', 'not', 'allow', 'duplicate', 'keys', 
            'with', 'new', 'values', 'overwriting', 'old', 'ones', 'if', 'a', 'key', 'is', 'reused',
            'function', 'variable', 'constant', 'array', 'object', 'class', 'method', 'property', 'loop', 'condition',
            'statement', 'expression', 'operator', 'parameter', 'argument', 'return', 'break', 'continue', 'switch',
            'case', 'default', 'import', 'export', 'module', 'package', 'library', 'framework', 'syntax', 'error',
            'exception', 'catch', 'try', 'finally', 'throw', 'debug', 'compile', 'execute', 'run', 'test', 'assert',
            'mock', 'spy', 'stub', 'async', 'await', 'promise', 'callback', 'event', 'listener', 'handler', 'queue',
            'stack', 'heap', 'memory', 'pointer', 'reference', 'value', 'scope', 'closure', 'context', 'this',
            'prototype', 'inheritance', 'encapsulation', 'polymorphism', 'abstraction', 'interface', 'implements',
            'extends', 'super', 'constructor', 'destructor', 'public', 'private', 'protected', 'static', 'final',
            'const', 'let', 'var', 'typeof', 'instanceof', 'new', 'delete', 'void', 'yield', 'import', 'export',
            'default', 'from', 'as', 'try', 'catch', 'finally', 'throw', 'if', 'else', 'for', 'while', 'do', 'switch',
            'case', 'break', 'continue', 'return', 'true', 'false', 'null', 'undefined', 'NaN', 'Infinity',
            // 1000 simple English words
            'the','of','and','a','to','in','is','you','that','it','he','was','for','on','are','as','with','his','they','I',
            'at','be','this','have','from','or','one','had','by','word','but','not','what','all','were','we','when','your','can',
            'said','there','use','an','each','which','she','do','how','their','if','will','up','other','about','out','many','then',
            'them','these','so','some','her','would','make','like','him','into','time','has','look','two','more','write','go','see',
            'number','no','way','could','people','my','than','first','water','been','call','who','oil','its','now','find','long','down',
            'day','did','get','come','made','may','part','over','new','sound','take','only','little','work','know','place','year','live',
            'me','back','give','most','very','after','thing','our','just','name','good','sentence','man','think','say','great','where',
            'help','through','much','before','line','right','too','means','old','any','same','tell','boy','follow','came','want','show',
            'also','around','form','three','small','set','put','end','does','another','well','large','must','big','even','such','because',
            'turn','here','why','ask','went','men','read','need','land','different','home','us','move','try','kind','hand','picture','again',
            'change','off','play','spell','air','away','animal','house','point','page','letter','mother','answer','found','study','still',
            'learn','should','America','world','high','every','near','add','food','between','own','below','country','plant','last','school',
            'father','keep','tree','never','start','city','earth','eye','light','thought','head','under','story','saw','left','don\'t','few',
            'while','along','might','close','something','seem','next','hard','open','example','begin','life','always','those','both','paper',
            'together','got','group','often','run','important','until','children','side','feet','car','mile','night','walk','white','sea',
            'began','grow','took','river','four','carry','state','once','book','hear','stop','without','second','later','miss','idea','enough',
            'eat','face','watch','far','Indian','real','almost','let','above','girl','sometimes','mountain','cut','young','talk','soon','list',
            'song','being','leave','family','it\'s','body','music','color','stand','sun','question','fish','area','mark','dog','horse','bird',
            'problem','complete','room','knew','since','ever','piece','told','usually','didn\'t','friends','easy','heard','order','red','door',
            'sure','become','top','ship','across','today','during','short','better','best','however','low','hours','black','products','happened',
            'whole','measure','remember','early','waves','reached','listen','wind','rock','space','covered','fast','several','hold','himself',
            'toward','five','step','morning','passed','vowel','true','hundred','against','pattern','numeral','table','north','slowly','money',
            'map','farm','pulled','draw','voice','seen','cold','cried','plan','notice','south','sing','war','ground','fall','king','town','I\'ll',
            'unit','figure','certain','field','travel','wood','fire','upon','done','English','road','halt','ten','fly','gave','box','finally',
            'wait','correct','oh','quickly','person','became','shown','minutes','strong','verb','stars','front','feel','fact','inches','street',
            'decided','contain','course','surface','produce','building','ocean','class','note','nothing','rest','carefully','scientists','inside',
            'wheels','stay','green','known','island','week','less','machine','base','ago','stood','plane','system','behind','ran','round','boat',
            'game','force','brought','understand','warm','common','bring','explain','dry','though','language','shape','deep','thousands','yes',
            'clear','equation','yet','government','filled','heat','full','hot','check','object','am','rule','among','noun','power','cannot','able',
            'six','size','dark','ball','material','special','heavy','fine','pair','circle','include','built','can\'t','matter','square','syllables',
            'perhaps','bill','felt','suddenly','test','direction','center','farmers','ready','anything','divided','general','energy','subject',
            'Europe','moon','region','return','believe','dance','members','picked','simple','cells','paint','mind','love','cause','rain','exercise',
            'eggs','train','blue','wish','drop','developed','window','difference','distance','heart','site','sum','summer','wall','forest','probably',
            'legs','sat','main','winter','wide','written','length','reason','kept','interest','arms','brother','race','present','beautiful','store',
            'job','edge','past','sign','record','finished','discovered','wild','happy','beside','gone','sky','glass','million','west','lay','weather',
            'root','instruments','meet','third','months','paragraph','raised','represent','soft','whether','clothes','flowers','shall','teacher',
            'held','describe','drive','cross','speak','solve','appear','metal','son','either','ice','sleep','village','factors','result','jumped',
            'snow','ride','care','floor','hill','pushed','baby','buy','century','outside','everything','tall','already','instead','phrase','soil',
            'bed','copy','free','hope','spring','case','laughed','nation','quite','type','themselves','temperature','bright','lead','everyone',
            'method','section','lake','iron','within','dictionary','hair','age','amount','scale','pounds','although','per','broken','moment','tiny',
            'possible','gold','milk','quiet','natural','lot','stone','act','build','middle','speed','count','consonant','someone','sail','rolled',
            'bear','wonder','smiled','angle','fraction','Africa','killed','melody','bottom','trip','hole','poor','let\'s','fight','surprise','French',
            'died','beat','exactly','remain','dress','cat','couldn\'t','fingers','row','least','catch','climbed','wrote','shouted','continued','itself',
            'else','plains','gas','England','burning','design','joined','foot','law','ears','grass',
            'brown','trouble','cool','cloud','lost','sent','symbols','wear','bad','save','experiment','engine','alone','drawing','east','pay','single',
            'touch','information','express','mouth','yard','equal','decimal','yourself','control','practice','report','straight','rise','statement',
            'stick','party','seeds','suppose','woman','coast','bank','period','wire','choose','clean','visit','bit','whose','received','garden','please',
            'strange','caught','fell','team','God','captain','direct','ring','serve','child','desert','increase','history','cost','maybe','business',
            'separate','break','uncle','hunting','flow','lady','students','human','art','feeling','supply','corner','electric','insects','crops','tone',
            'hit','sand','doctor','provide','thus','won\'t','cook','bones','mall','board','modern','compound','mine','wasn\'t','fit','addition','belong',
            'safe','soldiers','guess','silent','trade','rather','compare','crowd','poem','enjoy','elements','indicate','except','expect','flat','seven',
            'interesting','sense','string','blow','famous','value','wings','movement','pole','exciting','branches','thick','blood','lie','spot','bell',
            'fun','loud','consider','suggested','thin','position','entered','fruit','tied','rich','dollars','send','sight','chief','Japanese','stream',
            'planets','rhythm','eight','science','major','observe','tube','necessary','weight','meat','lifted','process','army','hat','property','particular',
            'swim','terms','current','park','sell','shoulder','industry','wash','block','spread','cattle','wife','sharp','company','radio','we\'ll','action',
            'capital','factories','settled','yellow','isn\'t','printed','ahead','won','level','Japanese','hill','safe','cat','cent','season','clothes','sand',
            'doctor','provide','thus','won\'t','cook','bones','mall','board','modern','compound','mine','wasn\'t','fit','addition','belong','safe','soldiers',
            'guess','silent','trade','rather','compare','crowd','poem','enjoy','elements','indicate','except','expect','flat','seven','interesting','sense',
            'string','blow','famous','value','wings','movement','pole','exciting','branches','thick','blood','lie','spot','bell','fun','loud','consider',
            'suggested','thin','position','entered','fruit','tied','rich','dollars','send','sight','chief','Japanese','stream','planets','rhythm','eight',
            'science','major','observe','tube','necessary','weight','meat','lifted','process','army','hat','property','particular','swim','terms','current',
            'park','sell','shoulder','industry','wash','block','spread','cattle','wife','sharp','company','radio','we\'ll','action','capital','factories',
            'settled','yellow','isn\'t','printed','ahead','won','level'
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

            // Add numbers if enabled (prefix)
            if (this.numbersEnabled && Math.random() < 0.1) {
                const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
                word = randomNumber + word;
            }

            // Add punctuation/capitalization if enabled
            if (this.punctuationEnabled) {
                // Randomly capitalize (about 1 in 4 words)
                if (Math.random() < 0.25 && word.length > 0) {
                    word = word[0].toUpperCase() + word.slice(1);
                }
                // Add punctuation (about 1 in 5 words)
                if (Math.random() < 0.2 && !punctuationMarks.includes(word[word.length - 1])) {
                    const randomPunct = punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
                    word += randomPunct;
                }
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
        let tabPressed = false;
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && e.shiftKey) {
                e.preventDefault();
                this.restart();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                tabPressed = true;
                setTimeout(() => { tabPressed = false; }, 1000); // Reset after 1 second
            } else if (e.key === 'Enter' && tabPressed) {
                e.preventDefault();
                this.restart();
                tabPressed = false;
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
            
            // Auto-scroll functionality
            this.autoScroll();
        }
    }
    
    autoScroll() {
        const currentWordElement = document.querySelector(`[data-word-index="${this.currentWordIndex}"]`);
        if (!currentWordElement) return;
        
        const container = this.elements.typingText;
        const containerHeight = container.offsetHeight;
        const containerScrollTop = container.scrollTop;
        
        // Get the position of the current word relative to the container
        const wordRect = currentWordElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const wordTop = wordRect.top - containerRect.top + containerScrollTop;
        const wordHeight = wordRect.height;
        
        // Calculate the line height (using the word height as a reference)
        const lineHeight = wordHeight;
        
        // Check if we need to scroll
        const visibleTop = containerScrollTop;
        const visibleBottom = containerScrollTop + containerHeight;
        
        // If the current word is below the visible area or close to the bottom
        if (wordTop + lineHeight > visibleBottom - lineHeight) {
            // Scroll down to show the next line
            container.scrollTop = wordTop - lineHeight;
        }
        // If the current word is above the visible area
        else if (wordTop < visibleTop) {
            // Scroll up to show the current line
            container.scrollTop = wordTop - lineHeight;
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
        this.elements.typingText.scrollTop = 0; // Reset scroll position
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
