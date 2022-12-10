document.querySelector('#search-bar').addEventListener('submit', (e) => {
    e.preventDefault();

    if (document.querySelector('#search-bar').children.length === 3) {
        let lc = document.querySelector('#search-bar').lastChild;
        lc.parentElement.removeChild(lc);
    }

    let searchQ = document.querySelector('#searchQ').value;
    if (searchQ === "")
        return;
    let c = searchForWord(searchQ);

    let sr = document.createElement('h3');
    sr.innerText = 'WordCount : ' + c + '(s)';
    document.querySelector('#search-bar').appendChild(sr);
});

let orgtext = '';

function SelectBook(item) {
    let url = '';

    if (item === 10)
        url = 'AliceInWonderland.txt';
    else if (item === 20)
        url = 'LOTR.txt';
    else
        url = 'JekyllAndHyde.txt'


    let req = new XMLHttpRequest();

    req.addEventListener('load', (e) => {
        document.querySelector('#story_print').value = "";
        document.querySelector('#story_print').value = e.target.responseText;
        orgtext = e.target.responseText;
        refreshStats(e.target.responseText, e.loaded);
    });

    req.open('GET', `text/${url}`);
    req.send();
}

function refreshStats(item, length) {
    let splitted = item.split(" ").map((v) => v.toLowerCase());
    let wordCount = splitted.length;

    const removeWords = [
        "", "a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as"
        , "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either",
        "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his",
        "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may",
        "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or",
        "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that",
        "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants",
        "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would",
        "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't",
        "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's",
        "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't",
        "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're",
        "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd",
        "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're",
        "you've"
    ];

    splitted = splitted.filter(function (x) {
        return !removeWords.includes(x) ;
    });

    const wordOccurrences = {};
    for (let i = 0; i < splitted.length; i++) {
        wordOccurrences['_' + splitted[i]] = ( wordOccurrences['_' + splitted[i]] || 0 ) + 1;
    }

    const fA = Object.keys(wordOccurrences).map(key => [key, wordOccurrences[key]]);
    fA.sort((a, b) => b[1] - a[1]);
    let top5 = fA.splice(0, 5);
    let last5 = fA.splice(fA.length - 5);

    console.log(top5);

    document.querySelector('#most-used').innerHTML = '';
    for (let v of top5) document.querySelector('#most-used').innerHTML += `${v[0].slice(1)}: ${v[1]}(s) <br>`;

    document.querySelector('#least-used').innerHTML = '';
    for (let v of last5) document.querySelector('#least-used').innerHTML += `${v[0].slice(1)}: ${v[1]}(s) <br>`;

    document.querySelector('#doc-stats').innerHTML = '';
    document.querySelector('#doc-stats').innerHTML += `Length: ${length} <br>`;
    document.querySelector('#doc-stats').innerHTML += `WordCount: ${wordCount}`;

}

function searchForWord(searchQ) {

    if (document.querySelector('#story_print').value === "")
        return;
    document.querySelector('#story_print').value = orgtext;
    let text = document.querySelector('#story_print').value;
    let cBy = '<span style="background-color: cyan">word</span>';
    cBy.replace('word', searchQ);
    text.replace(searchQ, cBy);

    let arr = orgtext.split(' ');
    let count = 0
    for (let i of arr)
        if (i.toLowerCase() === searchQ.toLowerCase())
            count ++;

    return count;
}



