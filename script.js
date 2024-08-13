let price = document.getElementById('price');
let taxe = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let totale = document.getElementById('totale');
let create = document.getElementById('submit');
let title = document.getElementById('title');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');

let mycreate = document.getElementById('create');

// fonction pour calculer totale pour un produit donner 


function getTotle()
{
    let resulat = "";
    if(price.value != '')
    {
         resulat = Number(price.value) + Number(taxe.value) + Number(ads.value) - Number(discount.value);
         totale.innerHTML = resulat ; 
         totale.style.backgroundColor= "green";
    }
   
    else 
    {
        totale.innerHTML = "" ;
        totale.style.backgroundColor= "red";
    }
    
}

// get info from and put it in the localStorage as a object 
// localStorage.clear();
let data ;
if(localStorage.product != null)
{
    data = JSON.parse(localStorage.product);
}
else 
{
    data = [];
}

create.onclick = function AddPro(){
    let mode = 'create';
    let user = 
    {
        title : title.value,
        price : price.value,
        taxe : taxe.value,
        discount:discount.value,
        ads: ads.value,
        totale : totale.innerHTML ,
        category : category.value, 
        count : count.value
    }

    Addbycount(user , mode);
    
    
   
}
 
// let table ="";
showdate();

//   clear date 

function clearInput()
{
     // vide les chanps 
     title.value = "" ;
     price.value = "" ; 
     taxe.value = "" ;
     discount.value="" ;
     ads.value="" ;
     count.value = "";
     totale.innerHTML ="" ;
     totale.style.backgroundColor ="red";
     category.value= "";
}

//  read date 

function showdate()
{
    let table = "";
    for(let i = 0 ; i < data.length ; i++)
    {
        table += `
            <tr>
                <td id="td_id">${i}</td>
                <td id="td_title">${data[i].title}</td>
                <td id="td_price">${data[i].price}</td>
                <td id="td_taxe">${data[i].taxe}</td>
                <td id="td_ads">${data[i].ads}</td>
                <td id="td_discount">${data[i].discount}</td>
                <td id="td_total">${data[i].totale}</td>
                <td id="td_category">${data[i].category}</td>
                <td>
                    <button onclick= 'myUpdate(${i})' >update</button>
                </td>
                <td>
                    <button id='delete' onclick = 'deleteproduct(  ${i} )'>delete</button>
                </td>
            </tr>`;
    }
    
    document.getElementById('tbody').innerHTML = table;
    console.log(data);

    //  ajouter boutton pour supprimer tous 
    addButton();

}

function deleteproduct(i)
{
    
    data.splice(i , 1);
    
    localStorage.setItem('product' , JSON.stringify(data));
   
    showdate();
}

//  add button for  all date if existe 

function addButton()
{
    let btn_deleteAll = document.getElementById('deleteAll') ;
    if(data.length != 0)
        {
            btn_deleteAll.innerHTML = `
                <button onclick='deleteAll()' class="deleteAll">deleteAll</button>
            `
        }
        else 
        {
            btn_deleteAll.innerHTML = "";
        }

}

//   delete all date if existe 

function deleteAll()
{
    data.splice(0,data.length);
    localStorage.product = JSON.stringify(data);
    showdate();

}


//  coount 

function Addbycount(user , mode , i=0)
{
     
       if(mode == 'create')
       {
        if(user.title != '' 
            && user.price != ''
            && user.category != ''
            && user.count < 100
           )
           {
            if(user.count > 1)
                {
                 for(let i = 0  ; i < user.count ; i++)
                 {
                     data.push(user);
                     localStorage.setItem('product' , JSON.stringify(data));
                 }
         
                }
                else 
                {
                     data.push(user);
                     localStorage.setItem('product' , JSON.stringify(data));
                }
                clearInput(); 
           }
           
       }
       else 
       {
        console.log('je suis dans update ' + i);
        if(user.title != '' 
            && user.price != ''
            && user.category != ''
            && user.count < 100
           )
           {
               
                data[i]=user;
                localStorage.product = JSON.stringify(data);
                //   show button create an display upadet 
                
                mycreate.innerHTML = "";
                create.style.display = "inline-block";
                clearInput(); 
           }
        
       }
       showdate();
}

//  Update 

function myUpdate(i)
{
    mydata = data[i];
    title.value = mydata.title ;
    price.value = mydata.price ; 
    taxe.value = mydata.taxe ;
    discount.value= mydata.discount ;
    ads.value= mydata.ads ;
    count.value = mydata.count;
    totale.innerHTML = mydata.totale ;
   
    category.value= mydata.category;

    
    
    create.style.display = "none";
    mycreate.innerHTML = `
         <button id='update' onclick='UpdatePro(${i})' class="update">Update</button>
    `
    document.getElementById('update').style.backgroundColor = "rgb(223, 191, 11)"

    
    
   
}

function UpdatePro(i)
{
    let mode = 'update';
     // changet les donner 
     let user = 
     {
         title : title.value,
         price : price.value,
         taxe : taxe.value,
         discount:discount.value,
         ads: ads.value,
         totale : totale.innerHTML ,
         category : category.value, 
         count : count.value
     }
    Addbycount(user , mode , i);
    
    
}


// search by title or by category 

let SearchMode = 'title';

function getSearchMode(id)
{
    let search = document.getElementById('search');
    if(id == 'searchbyTitle')
    {
        SearchMode = 'title';
    }
    else 
    {
        SearchMode = 'category';
    }
    search.focus();
    // style for search input 
    search.setAttribute('placeholder' , 'Search By '+SearchMode);
    // end style 
   ;
}

// fuction de recherche 

search.onkeyup = () =>
{
   
    let table = '';
    for(let i = 0 ; i < data.length ; i++)
    {
        if(SearchMode == 'title')
            {
                if((data[i].title.toUpperCase()).includes(search.value.toUpperCase()))
                        {
                            table += `
                                <tr>
                                    <td id="td_id">${i}</td>
                                    <td id="td_title">${data[i].title}</td>
                                    <td id="td_price">${data[i].price}</td>
                                    <td id="td_taxe">${data[i].taxe}</td>
                                    <td id="td_ads">${data[i].ads}</td>
                                    <td id="td_discount">${data[i].discount}</td>
                                    <td id="td_total">${data[i].totale}</td>
                                    <td id="td_category">${data[i].category}</td>
                                    <td>
                                        <button onclick= 'myUpdate(${i})' >update</button>
                                    </td>
                                    <td>
                                        <button id='delete' onclick = 'deleteproduct(  ${i} )'>delete</button>
                                    </td>
                                </tr>`;
                        }     
            }
        else
            {
                
                    if(((data[i].category).toUpperCase()).includes((search.value).toUpperCase()))
                    {
                        table += `
                        <tr>
                            <td id="td_id">${i}</td>
                            <td id="td_title">${data[i].title}</td>
                            <td id="td_price">${data[i].price}</td>
                            <td id="td_taxe">${data[i].taxe}</td>
                            <td id="td_ads">${data[i].ads}</td>
                            <td id="td_discount">${data[i].discount}</td>
                            <td id="td_total">${data[i].totale}</td>
                            <td id="td_category">${data[i].category}</td>
                            <td>
                                <button onclick= 'myUpdate(${i})' >update</button>
                            </td>
                            <td>
                                <button id='delete' onclick = 'deleteproduct(  ${i} )'>delete</button>
                            </td>
                        </tr>`;
                    }
            }
    }
        

        document.getElementById('tbody').innerHTML = table;
}

//  render tous comme il est avant 
search.onblur = ()=>
{
    showdate();
    search.blur();
    search.setAttribute('placeholder' , 'Search');
    search.value = "";
}