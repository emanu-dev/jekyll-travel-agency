const scrollView = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default scrollView;