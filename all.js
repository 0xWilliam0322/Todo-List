const list = document.querySelector('.list');
const sendData = document.querySelector('.send');
const reset = document.querySelector('.reset');
let txt = document.querySelector ('.text');
// 每次在頁面讀取時，使用 getItem() 方法從 localStorage 取出資料，並透過 JSON.parse() 方法將資料轉換成陣列。然而第一次在提取資料會取不到資料，因此需要建立一個新的空陣列：
let data = JSON.parse(localStorage.getItem('listData')) || [];
 
//監聽與更新資料
sendData.addEventListener('click',addData, false);
list.addEventListener('click',toggleDone, false);
reset.addEventListener('click', cleanAllData);
updateList(data);

//新增
function addData(e){
    e.preventDefault ();
    // 取得 DOM 元素內的值，並且儲存於物件中的屬性
    if (!txt.value){
        alert ('目前無內容');
        return;
    }
    let todo = {
        content :txt.value
    };
  //因為data是陣列可以直接push
    data.push(todo);
    updateList(data);
    localStorage.setItem('listData', JSON.stringify(data));
    txt.value='';
}

//更新網頁
function updateList(items){
  let str = ' ';
  let len = items.length;
  for(let i = 0; i<len; i++){
    str +=`<li><a href="#" data-index= ${ i }>刪除</a><span>${items[i].content}</span></li>`;
  }
  list.innerHTML = str;
}

//刪除
function toggleDone(e){
  e.preventDefault(); //停止事件的默認動作
  let index = e.target.dataset.index;
  if (e.target.nodeName !== 'A'){
    return;
  }
  data.splice (index, 1);
  localStorage.setItem('listData',JSON.stringify(data));
  updateList(data);
}

// 重新設定，為了清空 localStorage 以及重新渲染畫面
function cleanAllData() {
  localStorage.clear();
  data = []; // 此變數為 JS 第 5 行的全域變數，因此不需要重新宣告
  localStorage.setItem("listData", JSON.stringify(data));
  updateList(data);
}
