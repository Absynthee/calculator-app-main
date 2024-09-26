// themeManager.ts

export const themes = {
    theme1: {
        '--theme-bg': 'hsl(226, 25%, 32%)',
        '--theme-output-bg': 'hsl(226, 34%, 15%)',
        '--theme-calc-bg': 'hsl(226, 29%, 21%)',
        '--theme-text-1': 'hsl(0, 0%, 100%)',
        '--theme-text-2': 'hsl(210, 11%, 29%)',
        '--theme-button-1': 'hsl(34, 24%, 89%)',
        '--theme-button-1-shadow': 'hsl(26, 16%, 65%)',
        '--theme-button-1-hover': 'hsl(0, 0%, 100%)',
        '--theme-button-1-hover-shadow': 'hsl(31, 16%, 63%)',
        '--theme-button-2': 'hsl(226, 20%, 50%)',
        '--theme-button-2-shadow': 'hsl(228, 26%, 36%)',
        '--theme-button-2-hover': 'hsl(226, 53%, 77%)',
        '--theme-button-2-hover-shadow': 'hsl(227, 27%, 36%)',
        '--theme-button-3': 'hsl(7, 65%, 48%)',
        '--theme-button-3-shadow': 'hsl(8, 78%, 31%)',
        '--theme-button-3-hover': 'hsl(8, 84%, 64%)',
        '--theme-button-3-hover-shadow': 'hsl(8, 78%, 31%)',
        '--theme-text-output': 'hsl(100, 40%, 100%)',
        '--theme-text-alt-2': 'hsl(100, 40%, 100%)',
  
          },

    theme2: {
      '--theme-bg': 'hsl(0, 0%, 90%)',
      '--theme-output-bg': 'hsl(0, 0%, 93%)',
      '--theme-calc-bg': 'hsl(0, 5%, 81%)',
      '--theme-text-1': 'hsl(100, 40%, 100%)',
      '--theme-text-2': 'hsl(60, 10%, 19%)',
      '--theme-button-1': 'hsl(45, 7%, 89%)',
      '--theme-button-1-shadow': 'hsl(35, 11%, 61%)',
      // ... add all other theme2 variables
      '--theme-button-1-hover': 'hsl(0, 0%, 100%)',
      '--theme-button-1-hover-shadow': 'hsl(31, 16%, 63%)',
      '--theme-button-2': 'hsl(186, 34%, 40%)',
      '--theme-button-2-shadow': 'hsl(188, 44%, 28%)',
      '--theme-button-2-hover': 'hsl(187, 38%, 59%)',
      '--theme-button-2-hover-shadow': 'hsl(186, 44%, 29%)',
      '--theme-button-3': 'hsl(7, 65%, 48%)',
      '--theme-button-3-shadow': 'hsl(25, 100%, 25%)',
      '--theme-button-3-hover': 'hsl(28, 93%, 57%)',
      '--theme-button-3-hover-shadow': 'hsl(25, 100%, 27%)',
      '--theme-text-output': 'hsl(100, 40%, 0%)',
      '--theme-text-alt-2': 'hsl(100, 40%, 0%)',

    },
    theme3: {
      '--theme-bg': 'hsl(268, 75%, 9%)',
      '--theme-output-bg': 'hsl(268, 71%, 12%)',
      '--theme-calc-bg': 'hsl(268, 71%, 12%)',
      '--theme-text-1': 'hsl(0, 0%, 100%)',
      '--theme-text-2': 'hsl(52, 100%, 62%)',
      '--theme-button-1': 'hsl(268, 47%, 21%)',
      '--theme-button-1-shadow': 'hsl(290, 70%, 36%)',
      // ... add all other theme3 variables
      '--theme-button-1-hover': 'hsl(0, 0%, 100%)',
      '--theme-button-1-hover-shadow': 'hsl(31, 16%, 63%)',
      '--theme-button-2': 'hsl(278, 87%, 26%)',
      '--theme-button-2-shadow': 'hsl(283, 97%, 54%)',
      '--theme-button-2-hover': 'hsl(226, 53%, 77%)',
      '--theme-button-2-hover-shadow': 'hsl(227, 27%, 36%)',
      '--theme-button-3': 'hsl(174, 69%, 58%)',
      '--theme-button-3-shadow': 'hsl(175, 92%, 75%)',
      '--theme-button-3-hover': 'hsl(176, 100%, 82%)',
      '--theme-button-3-hover-shadow': 'hsl(175, 92%, 75%)',
      '--theme-text-output': 'hsl(52, 100%, 62%)',
      '--theme-text-alt-2': 'hsl(100, 40%, 0%)',

    }
  };
  
  export const applyTheme = (theme: keyof typeof themes) => {
    const themeVariables = themes[theme];
    Object.entries(themeVariables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  };
  
  