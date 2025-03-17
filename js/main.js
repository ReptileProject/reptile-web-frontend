const pageMapping = new Map([
    ['speciesLink', '/html/main.html'],
    ['forumLink', '/html/main.html'],
    ['careLink', '/html/main.html'],
    ['marketLink', '/html/main.html']
]);

const updateLinkByClass = (htmlClass)=>{
    let links = document.querySelectorAll('.'+htmlClass);
    let targetPage = pageMapping.get(htmlClass);
    links.forEach(function(link){
        link.href = targetPage;
    })
}