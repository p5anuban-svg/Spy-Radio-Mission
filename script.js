// Micro:bit Letter to Number Mapping
const letterMap = {
    'A': [1, 1], 'B': [1, 2], 'C': [1, 3], 'D': [1, 4], 'E': [1, 5],
    'F': [2, 1], 'G': [2, 2], 'H': [2, 3], 'I': [2, 4], 'K': [2, 5],
    'L': [3, 1], 'M': [3, 2], 'N': [3, 3], 'O': [3, 4], 'P': [3, 5],
    'R': [4, 1], 'S': [4, 2], 'T': [4, 3], 'U': [4, 4], 'V': [4, 5],
    'W': [5, 1], 'X': [5, 2], 'Y': [5, 3], 'Z': [5, 4], '_': [5, 5]
};

// Create reverse mapping (number to letter)
const numberMap = {};
Object.entries(letterMap).forEach(([letter, coords]) => {
    const key = `${coords[0]},${coords[1]}`;
    numberMap[key] = letter;
});

// DOM Elements
const letterInput = document.getElementById('letterInput');
const letterOutput = document.getElementById('letterOutput');
const referenceTable = document.getElementById('referenceTable');
const toggleLetterVisibility = document.getElementById('toggleLetterVisibility');

// Difficulty level tracking
let difficultyLevel = 'easy'; // default
const difficultyRadios = document.querySelectorAll('input[name="difficulty"]');

difficultyRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        difficultyLevel = e.target.value;
        // Refresh output when difficulty changes
        letterInput.dispatchEvent(new Event('input'));
    });
});

// Toggle Letter Input Visibility
let isLetterVisible = false;
toggleLetterVisibility.addEventListener('click', () => {
    isLetterVisible = !isLetterVisible;
    letterInput.type = isLetterVisible ? 'text' : 'password';
    toggleLetterVisibility.classList.toggle('visible', isLetterVisible);
    // Refresh output to show/hide letters
    letterInput.dispatchEvent(new Event('input'));
});

// Letter to Number Conversion
letterInput.addEventListener('input', (e) => {
    const input = e.target.value.toUpperCase();

    if (!input) {
        letterOutput.innerHTML = `
            <div class="placeholder-text">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                พิมพ์ตัวอักษรเพื่อดูผลลัพธ์
            </div>
        `;
        letterOutput.classList.remove('has-content');
        // Highlighting removed for game difficulty
        return;
    }

    const numbers = [];
    const invalidChars = [];

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        // Handle space as underscore (position 5,5)
        if (char === ' ') {
            const [row, col] = [5, 5]; // Same as underscore
            const twoDigitFormat = `${row}${col}`;

            // Apply difficulty masking to spacebar too
            let shouldMask = false;
            if (difficultyLevel === 'easy') {
                shouldMask = false;
            } else if (difficultyLevel === 'medium') {
                shouldMask = Math.random() < 0.3;
            } else if (difficultyLevel === 'hard') {
                shouldMask = Math.random() < 0.6;
            }

            let displayFormat;
            if (shouldMask) {
                const hideFirst = Math.random() < 0.5;
                displayFormat = hideFirst ? `*${col}` : `${row}*`;
            } else {
                displayFormat = twoDigitFormat;
            }

            numbers.push(displayFormat);
            continue;
        }

        if (letterMap[char]) {
            const [row, col] = letterMap[char];
            // Format as 2-digit number (e.g., "23" instead of "2,3")
            const twoDigitFormat = `${row}${col}`;


            // Determine masking based on difficulty level
            let shouldMask = false;
            if (difficultyLevel === 'easy') {
                shouldMask = false; // 0% masking
            } else if (difficultyLevel === 'medium') {
                shouldMask = Math.random() < 0.3; // 30% masking
            } else if (difficultyLevel === 'hard') {
                shouldMask = Math.random() < 0.6; // 60% masking
            }

            // If masking, randomly choose to hide first or second digit
            let displayFormat;
            if (shouldMask) {
                const hideFirst = Math.random() < 0.5;
                displayFormat = hideFirst ? `*${col}` : `${row}*`;
            } else {
                displayFormat = twoDigitFormat;
            }


            numbers.push(displayFormat);
            // Highlighting removed for game difficulty
        } else {
            invalidChars.push(char);
        }
    }

    if (numbers.length > 0) {
        // Join all numbers with dash separator
        const result = numbers.join('-');

        letterOutput.innerHTML = `
            <div style="font-size: 3.5rem; color: var(--primary-500); font-weight: 700; text-align: center; padding: var(--spacing-lg);">
                ${result}
            </div>
        `;
        letterOutput.classList.add('has-content');
    }

    if (invalidChars.length > 0) {
        const errorMsg = `
            <div class="error-message">
                ⚠️ ตัวอักษรที่ไม่รองรับ: ${invalidChars.join(', ')}
            </div>
        `;
        letterOutput.innerHTML += errorMsg;
    }
});

// Number to Letter Conversion
numberInput.addEventListener('input', (e) => {
    const input = e.target.value;

    if (!input) {
        numberOutput.innerHTML = `
            <div class="placeholder-text">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                พิมพ์ตัวเลขเพื่อดูผลลัพธ์
            </div>
        `;
        numberOutput.classList.remove('has-content');
        // Highlighting removed for game difficulty
        return;
    }

    // Parse input - support multiple formats
    // Examples: "1,1 1,2" or "1,1,1,2" or "11 12" or "1-1 1-2"
    const pairs = input
        .replace(/[\s,\-]+/g, ' ')  // Replace separators with space
        .trim()
        .split(' ')
        .filter(pair => pair.length > 0);

    const results = [];
    const errors = [];

    pairs.forEach((pair, index) => {
        // Try to parse as two digits
        let row, col;

        if (pair.length === 2 && /^\d\d$/.test(pair)) {
            // Format: "11" -> row=1, col=1
            row = parseInt(pair[0]);
            col = parseInt(pair[1]);
        } else if (pair.includes(',')) {
            // Format: "1,1"
            const parts = pair.split(',');
            if (parts.length === 2) {
                row = parseInt(parts[0]);
                col = parseInt(parts[1]);
            }
        } else if (pair.includes('-')) {
            // Format: "1-1"
            const parts = pair.split('-');
            if (parts.length === 2) {
                row = parseInt(parts[0]);
                col = parseInt(parts[1]);
            }
        }

        if (row && col) {
            const key = `${row},${col}`;
            if (numberMap[key]) {
                const letter = numberMap[key];
                results.push(`
                    <div class="result-item" style="animation-delay: ${index * 0.05}s">
                        <span class="coords">${row},${col}</span>
                        <span class="arrow">→</span>
                        <span class="letter">${letter}</span>
                    </div>
                `);
                // Highlighting removed for game difficulty
            } else {
                errors.push(`${row},${col} (นอกขอบเขต)`);
            }
        } else {
            errors.push(`"${pair}" (รูปแบบไม่ถูกต้อง)`);
        }
    });

    if (results.length > 0) {
        // Show individual results
        numberOutput.innerHTML = results.join('');

        // Add combined result
        const letters = [];
        pairs.forEach(pair => {
            let row, col;
            if (pair.length === 2 && /^\d\d$/.test(pair)) {
                row = parseInt(pair[0]);
                col = parseInt(pair[1]);
            } else if (pair.includes(',')) {
                const parts = pair.split(',');
                if (parts.length === 2) {
                    row = parseInt(parts[0]);
                    col = parseInt(parts[1]);
                }
            } else if (pair.includes('-')) {
                const parts = pair.split('-');
                if (parts.length === 2) {
                    row = parseInt(parts[0]);
                    col = parseInt(parts[1]);
                }
            }

            if (row && col) {
                const key = `${row},${col}`;
                if (numberMap[key]) {
                    letters.push(numberMap[key]);
                }
            }
        });

        if (letters.length > 0) {
            numberOutput.innerHTML += `
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                    <strong style="color: var(--success-500);">ข้อความรวม:</strong> 
                    <span style="font-size: 1.3rem; color: var(--primary-500); font-weight: 700;">${letters.join('')}</span>
                </div>
            `;
        }

        numberOutput.classList.add('has-content');
    } else {
        numberOutput.innerHTML = `
            <div class="placeholder-text">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                พิมพ์ตัวเลขเพื่อดูผลลัพธ์
            </div>
        `;
        numberOutput.classList.remove('has-content');
    }

    if (errors.length > 0) {
        const errorMsg = `
            <div class="error-message">
                ⚠️ ข้อผิดพลาด: ${errors.join(', ')}
            </div>
        `;
        numberOutput.innerHTML += errorMsg;
    }
});

// Table Cell Click - Copy to Input (without highlighting)
referenceTable.addEventListener('click', (e) => {
    const cell = e.target.closest('td[data-row][data-col]');
    if (cell) {
        const letter = cell.textContent;

        // Add to letter input
        letterInput.value += letter;
        letterInput.dispatchEvent(new Event('input'));

        // Focus on input
        letterInput.focus();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus letter input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        letterInput.focus();
        letterInput.select();
    }

    // Ctrl/Cmd + L to focus number input
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        numberInput.focus();
        numberInput.select();
    }

    // Escape to clear both inputs
    if (e.key === 'Escape') {
        letterInput.value = '';
        numberInput.value = '';
        letterInput.dispatchEvent(new Event('input'));
        numberInput.dispatchEvent(new Event('input'));
    }
});

// Auto-focus on letter input when page loads
window.addEventListener('load', () => {
    letterInput.focus();
});
