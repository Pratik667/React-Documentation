var assessmentContent = {};
var assessmentLoading = true;

function setAssessmentContent(data) {
    assessmentContent = data || {};
    assessmentLoading = false;
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new Event('assessmentContentLoaded'));
    }
}

function loadAssessmentContent() {
    if (window.practiceSets && Object.keys(window.practiceSets).length > 0) {
        setAssessmentContent(window.practiceSets);
        return;
    }

    fetch('practise/practice-sets.json')
        .then(response => response.json())
        .then(data => {
            setAssessmentContent(data);
        })
        .catch(error => {
            console.error('Failed to load practice sets:', error);
            assessmentContent = {
                set1: [],
                set2: []
            };
            assessmentLoading = false;
        });
}

loadAssessmentContent();

