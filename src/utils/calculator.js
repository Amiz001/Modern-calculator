/**
 * Safe Mathematical Expression Evaluator
 * Evaluates standard arithmetic expressions with proper operator precedence,
 * precision rounding, and division-by-zero protection without using unsafe eval().
 */

// Tokenizes an expression like "12.5 + 3 * 4" into tokens
function tokenize(expression) {
  // Normalize symbols
  const sanitized = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-');

  const tokens = [];
  let currentNum = '';

  for (let i = 0; i < sanitized.length; i++) {
    const char = sanitized[i];

    if ((char >= '0' && char <= '9') || char === '.') {
      currentNum += char;
    } else if (['+', '-', '*', '/'].includes(char)) {
      if (currentNum !== '') {
        tokens.push(Number(currentNum));
        currentNum = '';
      } else if (char === '-' && (tokens.length === 0 || typeof tokens[tokens.length - 1] === 'string')) {
        // Negative number handling at start or after an operator
        currentNum = '-';
        continue;
      }
      tokens.push(char);
    }
  }

  if (currentNum !== '' && currentNum !== '-') {
    tokens.push(Number(currentNum));
  }

  return tokens;
}

/**
 * Safely evaluates an arithmetic expression string
 * @param {string} expr 
 * @returns {string} Evaluated result or "Error"
 */
export function safeEvaluate(expr) {
  if (!expr || typeof expr !== 'string') return '0';

  // Strip trailing operators
  let cleaned = expr.trim().replace(/[+\-*/×÷−]+$/, '');
  if (!cleaned) return '0';

  try {
    const tokens = tokenize(cleaned);
    if (tokens.length === 0) return '0';

    // First pass: Multiplication and Division
    const afterMulDiv = [];
    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];
      if (token === '*' || token === '/') {
        const prev = afterMulDiv.pop();
        const next = tokens[i + 1];

        if (typeof prev !== 'number' || typeof next !== 'number') {
          return 'Error';
        }

        if (token === '/') {
          if (next === 0) return 'Error'; // Division by zero
          afterMulDiv.push(prev / next);
        } else {
          afterMulDiv.push(prev * next);
        }
        i += 2;
      } else {
        afterMulDiv.push(token);
        i++;
      }
    }

    // Second pass: Addition and Subtraction
    let result = typeof afterMulDiv[0] === 'number' ? afterMulDiv[0] : 0;
    let j = 1;
    while (j < afterMulDiv.length) {
      const op = afterMulDiv[j];
      const next = afterMulDiv[j + 1];

      if (typeof next !== 'number') return 'Error';

      if (op === '+') {
        result += next;
      } else if (op === '-') {
        result -= next;
      }
      j += 2;
    }

    if (!Number.isFinite(result)) {
      return 'Error';
    }

    // Fix floating point precision issues (e.g. 0.1 + 0.2 = 0.3)
    const formatted = parseFloat(result.toFixed(10));
    return String(formatted);
  } catch {
    return 'Error';
  }
}

/**
 * Validates whether adding a decimal point is valid in the current expression
 * @param {string} currentText 
 * @returns {boolean}
 */
export function canAddDecimal(currentText) {
  if (!currentText) return true;
  // Get the last number token after any operator
  const segments = currentText.split(/[+\-*/×÷]/);
  const lastSegment = segments[segments.length - 1];
  return !lastSegment.includes('.');
}
