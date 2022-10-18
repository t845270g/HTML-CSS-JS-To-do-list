let add=document.querySelector("form button");
let section=document.querySelector("section");
// localStorage.clear()

load()
function load(){
    let loadData= JSON.parse(localStorage.getItem("list"));
    if (loadData){
            loadData.forEach(n=>{
            let new_item=document.createElement("div");//創建新容器存放每一筆新增的資料
            new_item.classList.add("todo");//新增類別
            if (n.done){new_item.classList.add("done")}
            new_item.setAttribute("draggable",true)//新增拖曳屬性

            //創建事項子標籤，新增類別，文字放入前面取得的值
            let text=document.createElement("p");
            text.classList.add("todo-text");
            text.innerText=n.todoText;

            //創建日期子標籤，新增類別，文字放入前面取得的值
            let time=document.createElement("p");
            time.classList.add("todo-time");
            time.innerText=n.todoYear+"-"+n.todoMon+"-"+n.todoDate;
            
            //在新增的一筆資料中，新增子標籤
            new_item.appendChild(time);//新增日期子標籤
            new_item.appendChild(text);//新增事項子標籤

            //新增清單的轉場動畫，動畫function在css設定好引用
            new_item.style="animation:scaleUp 0.5s forwards";
            section.appendChild(new_item);//在原有的section標籤中放上新增的一組資料
            })   
    }
}

add.addEventListener("click",(e)=>{
    e.preventDefault();//不要使用按鈕預設的送出資料功能
    
    let form=e.target.parentElement.parentElement;//取出新增鈕的母標籤，也就是整個輸入表單
    let thing=form.children[0].value;//取出母標籤中的第一個子標籤，也就是事項
    let day=form.children[1].children[0].value;//取出母標籤中的第三個子標籤，也就是事項日期

    if(thing===""){
        alert("請輸入事件");
        return
    }//如果沒有輸入完成就會直接結束函式

    let new_item=document.createElement("div");//創建新容器存放每一筆新增的資料
    new_item.classList.add("todo");//新增類別
    new_item.setAttribute("draggable",true)//新增拖曳屬性

    //創建事項子標籤，新增類別，文字放入前面取得的值
    let text=document.createElement("p");
    text.classList.add("todo-text");


    text.innerText=thing;

    //創建日期子標籤，新增類別，文字放入前面取得的值
    let time=document.createElement("p");
    time.classList.add("todo-time");
    time.innerText=day;


    //在新增的一筆資料中，新增子標籤
    new_item.appendChild(time);//新增日期子標籤
    new_item.appendChild(text);//新增事項子標籤



    //新增清單的轉場動畫，動畫function在css設定好引用
    new_item.style="animation:scaleUp 0.5s forwards";

    
    //創建一個物件來存放每件事項
    let mytodo={
        todoText:thing,
        todoYear:day.slice(0,4),
        todoMon:day.slice(5,7),
        todoDate:day.slice(8,10),
        done:false,
    }     

    
    //製作一個空間來存放資料
    let myList=localStorage.getItem("list");
    //如果這個空間還沒有東西，就把第一次抓出來的資料存進去(第一筆資料)
    if(JSON.parse(myList) == null ){
        localStorage.setItem("list",JSON.stringify([mytodo]));
        
    }

    //如果已經有(一筆)資料，先解讀資料內容回array型態，再新增資料，並存回去
    else{
        let myListarray=JSON.parse(myList);
        myListarray.push(mytodo)
        localStorage.setItem("list",JSON.stringify(myListarray))
    }


    
    section.appendChild(new_item);//在原有的section標籤中放上新增的一組資料

    form.children[0].value="";//刪除輸入視窗的文字
    
})

//將日期預設為今天
function setInputDate(_id){
                            var _dat = document.querySelector(_id);//取出指定id的標籤
                            var hoy = new Date(),
                                d = hoy.getDate(),
                                m = hoy.getMonth()+1, //取得月份，1月會取得0，2月會取得1，所以要顯示正確月份需要+1
                                y = hoy.getFullYear()
                                
                            if(d < 10){
                                d = "0"+d;
                            };//如果日期十天內，字串前面補0
                            if(m < 10){
                                m = "0"+m;
                            };//如果月份十天內，字串前面補0
                            data = y+"-"+m+"-"+d;//input date標籤輸入的格式寫法
                            _dat.value = data;//將標籤的值取代
                         };
setInputDate("#dateDefault");//丟入新的指定日期的值





//偵測選單

// 懸停時判斷，如果背景不是紅色，就讓背景變成淡白色
section.addEventListener("mouseover",(a)=>{
    a.target.style="animation:butBig 0.5s forwards;";
    if(a.target.classList.contains("selectng")==false){ a.target.style="background-color: rgb(255, 255, 255,0.3);"}

})



//滑鼠移開判斷，如果背景不是紅色，就恢復呼叫原狀的動畫
section.addEventListener("mouseout",(a)=>{
    a.target.style="animation:butSma 0.5s forwards";
})
let toto=document.querySelector(".todo");

// toto.addEventListener("drop",(e)=>{e.target.style=""})

//點擊，如果背景不是紅色，就把背景改紅色，不然就把背景改回透明
section.addEventListener("click",(a)=>{a.target.classList.toggle("selectng");if(a.target.classList.contains("selectng")){a.target.style="background-color: rgb(255, 0,0);"}else{a.target.style=""}})

let source = null;
let ss = null;
section.addEventListener("dragstart",e=>{source = e.target;section.childNodes.forEach((a,b)=>{if(a==source){ss=b}})})

let ck=document.querySelector(".check");
let re=document.querySelector(".remove");
ck.addEventListener("dragover",e=>{e.target.style="animation:butBig  0.2s forwards;background-color:rgb(82, 13, 230)";e.preventDefault();})
ck.addEventListener("dragleave",e=>{e.target.style="";})
ck.addEventListener("drop",(e)=>{e.target.style="animation:butSma  0.2s forwards;background-color:rgb(108, 106, 253)"
                                let changeMylist=JSON.parse(localStorage.getItem("list"));changeMylist.forEach((x,y)=>{
                                                                                                                        if(y==ss){
                                                                                                                        if(source.classList.contains("done")){
                                                                                                                                                                changeMylist[y].done=false
                                                                                                                                                            }
                                                                                                                        else{
                                                                                                                            changeMylist[y].done=true
                                                                                                                            }
                                                                                                                        source.classList.toggle("done");
                                                                                                                        source.classList.remove("selectng");
                                                                                                                        localStorage.setItem("list",JSON.stringify(changeMylist))
                                                                                                                                    }
                                                                                                                        }
                                                                                                                );source = null;
                                                                                                                    ss = null; 
                                })
ck.addEventListener("mouseover" ,e=>{e.target.style="animation:butBig  0.2s forwards;background-color:rgb(82, 13, 230)"})       
ck.addEventListener("mouseout" ,e=>{e.target.style="animation:butSma  0.2s forwards;background-color:rgb(108, 106, 253)"})                       
ck.addEventListener("click",()=>{let group01=section.childNodes;
                                    group01.forEach((n,m)=>{
                                                        if(n.classList.contains("selectng")){n.classList.toggle("done");n.classList.toggle("selectng");
                                                        //判斷是否完成代辦事項，完成的話將記憶體中的done屬性改為真，未完成則為假
                                                        let changeMylist=JSON.parse(localStorage.getItem("list"));
                                                        changeMylist.forEach((x,y)=>{
                                                            if (m===y){
                                                                if(changeMylist[y].done==true){changeMylist[y].done=false}
                                                                else{changeMylist[y].done=true};
                                                                localStorage.setItem("list",JSON.stringify(changeMylist))}
                                                        })
                                                        }
                                    })})

// re.addEventListener("dragover",e=>{e.preventDefault()})
re.addEventListener("dragover",(e)=>{e.preventDefault();e.target.style="animation:butBig  0.2s forwards;background-color:rgb(255,0,0)";})
re.addEventListener("dragleave",e=>{e.target.style="";})
re.addEventListener("drop",(e)=>{e.target.style="animation:butSma  0.2s forwards;background-color:red"
                                e.target.style="";source.remove();let changeMylist=JSON.parse(localStorage.getItem("list"));
                                                                    let cc=[];
                                                                    changeMylist.forEach((n,k)=>{cc.push(k)});
                                                                    let new0=[];
                                                                    new0= cc.filter(item => ![ss].includes(item));
                                                                    let 新資料=[];
                                                                    new0.forEach(n=>{
                                                                                    新資料.push(my= changeMylist[n])
                                                                                    }); 
                                                                    if (新資料==""){
                                                                                    localStorage.clear()
                                                                                    }
                                                                    else{
                                                                        localStorage.setItem("list",JSON.stringify(新資料))
                                                                    }//存回本機
                                                                    delete cc;
                                                                    delete new0;
                                                                    delete 新資料;
                                                                    source = null;
                                                                    ss = null;      
                                })
re.addEventListener("click",()=>{let 子標籤=section.childNodes;
                                let values=[];
                                //介面上被選中的資料順位(values)
                                子標籤.forEach((x,y)=>{//x為選中標籤，y為順位
                                    if(x.classList.contains("selectng")){//如果是選中的標籤則能進入判斷
                                        values.push(y);
                                        x.style="animation:scaleDown 0.2s forwards";//刪除UI中的動畫
                                        x.addEventListener("animationend",()=>{x.remove()});//刪除UI中的資料
                                    }
                                    });
                                //資料庫中所有資料的順位(aaa)
                                let aaa=[];
                                let my=JSON.parse(localStorage.getItem("list"));
                                my.forEach((a,b)=>{
                                    aaa.push(b)
                                });
                                
                                //遍歷資料庫的所有順位，跟選取的順位比較，沒有被選到的(也就是沒有被轟框選出來要丟垃圾桶的資料順位)順位保留
                                //例如:資料困有順位[0,1,2,3]
                                //選中u要被移除的資料順位有:[0,3]
                                //沒包含的就是要保留的資料也就是順位[1,2]
                                aaa = aaa.filter(item => !values.includes(item));
                                let 新資料=[];
                                aaa.forEach(n=>{
                                    新資料.push(my[n])
                                }); 
                                if (新資料==""){localStorage.clear()}
                                else{localStorage.setItem("list",JSON.stringify(新資料))}//存回本機
                                        })
                                        
  
let cle=document.querySelector(".clear");
cle.addEventListener("click",()=>{let yn=confirm("是否要清空代辦事項?")
                                    if(yn===true){localStorage.setItem('list',null);section.childNodes.forEach(m=>{m.style="animation:scaleDown 0.2s forwards";m.addEventListener("animationend",()=>{m.remove()})})
                                }})



function mergeNew(a1,a2){
    let r=[];
    let i=0;
    let j=0;
    
    while(i<a1.length  && j<a2.length){
        
        if (Number(a1[i].todoYear)<Number(a2[j].todoYear)){
            r.push(a2[j]);
            j++
        }else if(Number(a1[i].todoYear)==Number(a2[j].todoYear)){
                                                                    if (Number(a1[i].todoMon)<Number(a2[j].todoMon)){
                                                                        r.push(a2[j]);
                                                                        j++;
                                                                    }else if(Number(a1[i].todoMon)==Number(a2[j].todoMon)){
                                                                                                                            if(Number(a1[i].todoDate)<Number(a2[j].todoDate)){
                                                                                                                                r.push(a2[j]);
                                                                                                                                j++;
                                                                                                                            }else if(Number(a1[i].todoDate)==Number(a2[j].todoDate)){
                                                                                                                                r.push(a1[i]);
                                                                                                                                i++;
                                                                                                                            }else{
                                                                                                                                r.push(a1[i]);
                                                                                                                                i++;
                                                                                                                            }
                                                                    }else{
                                                                        r.push(a1[i]);
                                                                        i++
                                                                    }
        }
        else{
            r.push(a1[i]);
            i++;
        }
        
    }
    while(i<a1.length){
                        r.push(a1[i]);
                        i++
                        }
    while(j<a2.length){
                        r.push(a2[j]);
                        j++
                        }
    return r
}

function mergesortN(arr){
    let len=arr.length;
    if(len==1){
        return arr;
    }else{
        let m=Math.ceil(len/2);
        let left=arr.slice(0,m);
        let right= arr.slice(m,len);
        return  mergeNew(mergesortN(left),mergesortN(right))
    }
}

let newt=document.querySelector("button.new")

newt.addEventListener("click",e=>{
    let so=JSON.parse(localStorage.getItem("list"));
    localStorage.setItem("list",JSON.stringify(mergesortN(so)))
    let len=section.children.length;
    for (let i=0;i<len;i++){section.children[0].remove()}
    load()
   
})