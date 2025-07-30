import themes from '../Data/Themes.js';
import languages from '../Data/Language.js';

export const importThemes = async () => {
    try {
        await Promise.all(themes.map(theme =>
            import(`ace-builds/src-noconflict/theme-${theme.value}`)
        ));
        console.log('All themes have been imported successfully');
    } catch (error) {
        console.error('Error importing themes:', error);
    }
};

export const importLanguages = async () => {
    try {
        await Promise.all(languages.map(language =>
            Promise.all([
                import(`ace-builds/src-noconflict/mode-${language.value}`),
                import(`ace-builds/src-noconflict/snippets/${language.value}`)
            ])
        ));
        console.log('All languages have been imported successfully');
    } catch (error) {
        console.error('Error importing languages:', error);
    }
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}; 