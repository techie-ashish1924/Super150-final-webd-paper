


let orgtext = "";

function SelectBook(val)
{

    let link = "";
    if(val === 10)
    {
        link = "econd\text\AliceInWonderland.txt";
    }
    else if(val === 20)
    {
        link = "econd\text\JekyllAndHyde.txt"

    }

    else if(val === 30)
    {
        link = "econd\text\LOTR.txt";
    }

    let xhr = new XMLHttpRequest();

    xhr.open('GET',link,true);

    xhr.addEventListener('load',(e)=>
    {
        document.querySelector('#story_print').value = "";
        document.querySelector('#story_print').value = e.target.responseText;
        orgtext = e.target.responseText;
        refreshStats(e.target.responseText);

    });


} 




function searchWord()
{
    if(document.querySelector(#story_print).value === "")
        return;
    
}
